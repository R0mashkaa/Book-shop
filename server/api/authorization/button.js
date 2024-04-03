const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', async event => {
	event.preventDefault();

	// Отримати значення з поля введення
	const userInput = document.querySelector('#userInput').value;

	// Перевірка, чи рядок не є порожнім
	if (!userInput || userInput.trim() === '') {
		alert('Рядок порожній або містить тільки пробіли.');
		return;
	}

	const formData = new FormData(loginForm);
	const data = Object.fromEntries(formData.entries());

	const response = await fetch('auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const result = await response.json();
	if (result.accessToken && result.refreshToken) {
		document.cookie = 'accessToken=' + result.accessToken + '; max-age=3600';
		document.cookie = 'refreshToken=' + result.refreshToken + '; max-age=3600';
		window.location.href = '/postsPage';
	} else {
		alert(result.message);
	}
});
