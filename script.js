let people = JSON.parse(localStorage.getItem("people")) || []

function addNewPerson() {
  const name = prompt("请输入姓名：")
  if (name) {
    const person = {
      name: name,
      score: 0,
      id: Date.now(),
    }
    people.push(person)
    savePeople()
    renderCards()
  }
}

function updateScore(id, change) {
  const person = people.find((p) => p.id === id)
  if (person) {
    person.score += change
    savePeople()
    renderCards()
  }
}

function savePeople() {
  localStorage.setItem("people", JSON.stringify(people))
}

function renderCards() {
  const container = document.getElementById("cards-container")
  container.innerHTML = ""

  people.forEach((person) => {
    const card = document.createElement("div")
    card.className = "card"
    card.innerHTML = `
            <h3>${person.name}</h3>
            <div class="score">${person.score}</div>
            <button onclick="updateScore(${person.id}, 1)">增加</button>
            <button onclick="updateScore(${person.id}, -1)">减少</button>
        `
    container.appendChild(card)
  })
}

function resetAllScores() {
  if (confirm("确定要将所有人的得分清零吗？")) {
    people.forEach((person) => {
      person.score = 0
    })
    savePeople()
    renderCards()
  }
}

function clearAll() {
  if (confirm("确定要清空所有数据吗？")) {
    people = []
    savePeople()
    renderCards()
  }
}

renderCards()

document.addEventListener("gesturestart", function (e) {
  e.preventDefault()
})

document.addEventListener(
  "touchmove",
  function (e) {
    if (e.scale !== 1) {
      e.preventDefault()
    }
  },
  { passive: false }
)

document.addEventListener("dblclick", function (e) {
  e.preventDefault()
})
