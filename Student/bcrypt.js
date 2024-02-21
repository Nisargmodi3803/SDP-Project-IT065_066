const bcrypt = require('bcrypt')

const securePassword = async (password)=>
{
    const passwordHash = await bcrypt.hash(password,10)
    console.log(passwordHash)

    const passwordMatch = await bcrypt.compare(password,passwordHash)
    console.log(passwordMatch)
}

securePassword("Nisarg9712971148@password")