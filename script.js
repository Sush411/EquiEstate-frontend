const form = document.getElementById('financeForm');
const responseBox = document.getElementById('responseBox');
const adviceText = document.getElementById('adviceText');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const question = `I earn ₹${data.get("income")} per month, have ₹${data.get("savings")} in savings, am ${data.get("age")} years old, with ${data.get("risk")} risk tolerance. I prefer ${data.get("preference")}. Suggest an investment plan.`;

  const res = await fetch('https://equiestate-ai-backend.onrender.com/ask', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  const result = await res.json();
  adviceText.textContent = result.reply;
  responseBox.classList.remove("hidden");
});

document.getElementById('followupBtn').addEventListener('click', async () => {
  const followup = document.getElementById('followup').value;
  if (!followup) return;

  const res = await fetch('https://equiestate-ai-backend.onrender.com/ask', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: followup })
  });

  const result = await res.json();
  adviceText.textContent += "\n\n" + result.reply;
  document.getElementById('followup').value = "";
});

  