/*
 * Interactive script to create or update an admin user in MongoDB.
 * Usage:
 *   MONGODB_URI="..." node scripts/create_admin.js
 *
 * The script will prompt you for a password (no echo), hash it with bcrypt, and upsert
 * a user with username 'jmenichole' as admin. If you prefer to pass a password via
 * the environment, set ADMIN_PASSWORD (not recommended for security reasons).
 */

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const readline = require('readline')

function promptHidden(query) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    const stdin = process.stdin

    process.stdout.write(query)
    stdin.resume()
    stdin.setRawMode(true)

    let password = ''

    function onData(charBuffer) {
      const char = charBuffer.toString('utf8')
      if (char === '\r' || char === '\n' || char === '\u0004') {
        stdin.setRawMode(false)
        stdin.pause()
        process.stdout.write('\n')
        stdin.removeListener('data', onData)
        rl.close()
        resolve(password)
        return
      }
      if (char === '\u0003') { // Ctrl-C
        process.stdout.write('\n')
        process.exit(1)
      }
      if (char === '\x7f') { // backspace
        if (password.length > 0) {
          password = password.slice(0, -1)
          process.stdout.clearLine()
          process.stdout.cursorTo(0)
          process.stdout.write(query + '*'.repeat(password.length))
        }
        return
      }
      // Append and show asterisk
      password += char
      process.stdout.write('*')
    }

    stdin.on('data', onData)
  })
}

async function main() {
  const mongoURI = process.env.MONGODB_URI
  if (!mongoURI) {
    console.error('Please set MONGODB_URI in the environment')
    process.exit(1)
  }

  // Username fixed per your request
  const username = 'jmenichole'
  const email = process.env.ADMIN_EMAIL || 'jmenichole007@outlook.com'

  // Accept ADMIN_PASSWORD env (convenience) otherwise prompt interactively
  let password = process.env.ADMIN_PASSWORD
  if (!password) {
    password = await promptHidden('Enter password for admin user (input hidden): ')
  }

  if (!password || password.length < 6) {
    console.error('Password must be at least 6 characters long')
    process.exit(1)
  }

  const saltRounds = 10
  const passwordHash = bcrypt.hashSync(password, saltRounds)

  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

  const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profilePicture: String,
    bio: String,
    achievements: [String],
    rockCount: Number,
    huntCount: Number,
    role: String,
    isAdmin: Boolean,
    isModerator: Boolean
  }, { timestamps: true })

  const User = mongoose.models.User || mongoose.model('User', userSchema)

  const update = {
    username,
    email,
    password: passwordHash,
    role: 'admin',
    isAdmin: true
  }

  const opts = { upsert: true, new: true, setDefaultsOnInsert: true }
  const user = await User.findOneAndUpdate({ username }, update, opts)

  console.log('Upserted admin user:', user.username, 'isAdmin:', user.isAdmin)
  await mongoose.disconnect()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
