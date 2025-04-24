export default function handleKeyDown(e) {

    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        let letter = document.querySelectorAll('button');
        let letterArray = Array.from(letter);

        letterArray.filter((el) => {
            if (el.innerText === e.key.toUpperCase()) {
                el.classList.add('animate');
                setTimeout(() => {
                    el.classList.remove('animate');
                }, 400)
            }
        })

    } else if (e.key === 'Backspace') {

        let letter = document.getElementById('backspace');
        letter.classList.add('animate');
        setTimeout(() => {
            letter.classList.remove('animate');
        }, 400)

    } else if (e.key === 'Enter') {
        let letter = document.getElementById('enter');
        letter.classList.add('animate');
        setTimeout(() => {
            letter.classList.remove('animate');
        }, 400)
    }
}