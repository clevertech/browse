#!/usr/bin/env node

const path = require('path')
const opn = require('opn')

const readPackage = () => {
  try {
    return require(path.join(process.cwd(), 'package.json'))
  } catch (err) {
    throw new Error('Could not read package.json in the current directory')
  }
}

const errorHandler = err => {
  console.error(err)
  process.exit(1)
}

const run = () => {
  const packageJSON = readPackage()

  const findLinks = (path, obj, hash) => {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      Object.keys(obj).forEach(key => {
        const value = obj[key]
        findLinks(path.concat(key), value, hash)
      })
    } else if (typeof obj === 'string') {
      hash[path.join(' ')] = obj
    }
    return hash
  }

  const links = findLinks([], packageJSON.browse, {})
  if (Object.keys(links).length === 0) {
    console.log('No URLs found. Add your URLs inside `browse` in your `package.json` file')
    process.exit(0)
  }

  const open = input => {
    const url = links[input]
    if (!url) {
      console.error(`Could not find a link for "${input}"`)
      process.exit(1)
    }
    console.log(`Opening ${url} in your browser...`)
    return opn(url, { wait: false })
      .catch(errorHandler)
  }

  if (process.argv.length === 2) {
    const term = require('terminal-kit').terminal
    term('Available links to open\n')
    Object.keys(links).forEach(path => {
      term.cyan(path + '\n')
      term.green(`    ${links[path]}\n`)
    })
    term('Please enter the path to the link you want to open (autocomplete with tabulator): ')
    const autoComplete = Object.keys(links)

    term.inputField({ autoComplete, autoCompleteMenu: true }, (err, input) => {
      console.log()
      if (err) {
        console.error(err)
        process.exit(1)
      }
      const normalized = input.trim().split(/\W+/g).join(' ')
      open(normalized).then(() => process.exit(0))
    })
  } else {
    const input = process.argv.slice(2).join(' ')
    open(input)
  }
}

try {
  run()
} catch (err) {
  console.error(err.message || String(err))
  process.exit(1)
}

