const loginForm = document.querySelector("#button");
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Отримати значення з поля введення
    const userInput = document.querySelector("#chek").value;

    // Перевірка, чи рядок не є порожнім
    if (!userInput || userInput.trim() === "") {
        alert("Рядок порожній або містить тільки пробіли.");
        return;
    }

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/openai/completion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    alert(result.message);
});