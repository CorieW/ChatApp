export const minPasswordLength = 8
export const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
export const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
export const symbols = [' ', '!', `"`, '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']
    
export default function checkPasswordStrength(password)
{
    let strength = 0

    if (password.length >= minPasswordLength) {
        strength++

        if (includesCharacter(password)) {
            if (includesLowerCase(password) && includesUpperCase(password)) {
                strength++
            }

            if (includesNumber(password)) {
                strength++
            }
    
            if (includesSymbol(password)) {
                strength++
            }
        }
    }

    return strength;
}

export function findPasswordStrengthIssues(password)
{
    let issues = []

    if (password.length < minPasswordLength) {
        issues.push(`Password must contain at least ${minPasswordLength} characters`)
    }

    if (!includesLowerCase(password) || !includesUpperCase(password)) {
        issues.push(`Password should contain a mixture of uppercase and lowercase characters`)
    }

    if (!includesCharacter(password) || !includesNumber(password) || !includesSymbol(password)) {
        issues.push(`Password should contain atleast one character, one number and one symbol ('!', '@', '-'...)`)
    }

    return issues;
}

export function includesCharacter(password)
{
    let containsCharacter = false
    characters.forEach(character =>
    {
        if (password.toLowerCase().includes(character)) {
            containsCharacter = true
        }
    })
    return containsCharacter;
}

export function includesUpperCase(password)
{
    for (let i = 0; i < password.length; i++)
    {
        if (password[i] === password[i].toUpperCase() && characters.includes(password[i].toLowerCase())) {
            return true;
        }
    }
    return false;
}

export function includesLowerCase(password)
{
    for (let i = 0; i < password.length; i++)
    {
        if (password[i] === password[i].toLowerCase() && characters.includes(password[i].toLowerCase())) {
            return true;
        }
    }
    return false;
}

export function includesNumber(password)
{
    let containsNumber = false
    numbers.forEach(number =>
    {
        if (password.includes(number)) {
            containsNumber = true
        }
    })
    return containsNumber;
}

export function includesSymbol(password)
{
    let containsSymbol = false
    symbols.forEach(symbol =>
    {
        if (password.includes(symbol)) {
            containsSymbol = true
        }
    })
    return containsSymbol;
}