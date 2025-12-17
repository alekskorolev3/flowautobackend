export async function notifyAdmins(text) {
    const BOT_TOKEN = process.env.BOT_TOKEN
    const ADMIN_IDS = process.env.ADMIN_IDS?.split(',') || []

    if (!BOT_TOKEN || !ADMIN_IDS.length) return

    await Promise.all(
        ADMIN_IDS.map(id =>
            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: id, text })
            })
        )
    )
}
