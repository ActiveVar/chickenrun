const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')


let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })

}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'The chicken is lost in the farm, just waking up and not sure how it got here. You see an egg near you.',
        options: [
            {
                text: 'Take the egg',
                setState: { brownEgg: true },
                nextText: 2
            },
            {
                text: 'Leave the egg',
                nextText: 2,
            }
        ]
    },
    {
        id: 2,
        text: 'You are scared and looking for answers, here comes a bull towards you.',
        options: [
            {
                text: 'Trade the egg for the water',
                requiredState: (currentState) => currentState.brownEgg,
                setState: { brownEgg: false, water: true},
                nextText: 3
            },
            {
                text: 'Trade the egg for the cell phone',
                requiredState: (currentState) => currentState.brownEgg,
                setState: { brownEgg: false, phone: true},
                nextText: 3
            },
            {
                text: 'Ignore the bull',
                nextText: 3
            }
        ]
        
    },
    {
        id: 3,
        text: 'After leaving the bull, you stumble upon a chicken coop, it looks dangerous but you still want to go and check it out',
        options: [
            {
                text: 'Explore the coop',
                nextText: 4
            },
            {
                text: 'Go and see what is behind the barn',
                nextText: 5
            },
            {
                text: 'Hide under the tractor',
                nextText: 6
            }
        ]
        
    },
    {
        id: 4,
        text: 'You are still disoriented and faint to the ground as soon as you enter the chicken coop.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    }
]

startGame()