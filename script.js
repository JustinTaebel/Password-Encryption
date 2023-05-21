const pswrd = document.querySelector('#password')
const show = document.querySelector('.show')

show.onclick = function() {
    if (pswrd.type === 'password') {
        pswrd.setAttribute('type', 'text')
        show.classList.add('hide')
    }
    else {
        pswrd.setAttribute('type', 'password')
        show.classList.remove('hide')
    }
}

function length(password) {
    var level = 0
    if (password.length >= 6) {
        level++                    //1 point
    }
    if (password.length >= 9) {
        level++                    //2 points
    }
    if (password.length >= 12) {
        level = level + 2          //4 points
    }

    return level
}

function capital(password) {
    var level = 0

    if (password.match(/[A-Z]/g)) {
        var cap = password.match(/[A-Z]/g)
        if (cap.length < 2) {
            level++
        }
        if (cap.length >= 2) {
            level = level + 2
        }
    }

    return level
}

function number(password) {
    var level = 0
    
    if (password.match(/[0-9]/g)) {
        var num = password.match(/[0-9]/g)
        if (num.length < 2) {
            level++
        }
        if (num.length >= 2) {
            level = level + 3
        }
    }

    return level
}

function symbol(password) {
    var level = 0
    
    if (password.match(/[^A-Za-z0-9-'']/g)) {
        var sym = password.match(/[^A-Za-z0-9-'']/g)
        if (sym.length < 2) {
            level = level + 4
        }
        if (sym.length >= 2) {
            level = level + 5
        }
    }
    

    return level
}

function space(password) {
    
    if (password.match(' ')) {
        return true
    }
    else {
        return false
    }
}

const container = document.querySelector('.pass-box')
document.addEventListener("keyup", function(e) {
    const password = document.querySelector('#password').value

    len = length(password)    // 0, 1, 2, or 4 points possible
    cap = capital(password)  // 0, 1 or 2 points possible
    num = number(password)    // 0, 1 or 3 points possible
    sym = symbol(password)    // 0, 4, or 5 points possible


    //When input is empty, removes all messages
    var level = 0
    container.classList.remove('format')
    container.classList.remove('space')
    container.classList.remove('enc-btn')
    
    //Checks for spaces
    if (!space(password))
    {
        level = len + cap + num + sym
    }
    else {
        container.classList.add('space')
    }
    
    console.log(level)
    //if password is less 6 characters
    if (len < 1 || cap < 1 || sym < 1) {
        container.classList.add('weak')
        container.classList.remove('medium')
        container.classList.remove('strong')
        container.classList.add('format')
    }
    //password is 6 or more characters and can start checking for more
    else {
        
        if (level <= 4) {
            container.classList.add('weak')
            container.classList.remove('medium')
            container.classList.remove('strong')
        }
        if (level > 4 && level < 10) {
            container.classList.remove('weak')
            container.classList.add('medium')
            container.classList.remove('strong')
        }
        if (level >= 10) {
            container.classList.remove('weak')
            container.classList.remove('medium')
            container.classList.add('strong')
            container.classList.add('enc-btn')
        }

    }

})

const box = document.querySelector('.encrypt-box')
function encrypt() {
    const password = document.querySelector('#password').value

    hash = 0
    for (i = 0; i < password.length; i++) {
        char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    document.getElementById('enc-pass').innerHTML= hash
    box.classList.add('dec-btn')
}

function decrypt() {
    const password = document.getElementById('enc-pass').innerHTML
    document.getElementById('enc-pass').innerHTML= password
    box.classList.remove('dec-btn')
    document.getElementById('enc-pass').innerHTML= "DECRYPTED"
}