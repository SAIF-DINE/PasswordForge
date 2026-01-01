// لا ترسل أي شيء تلقائياً. استعمل دالة تُستدعى بعد موافقة صريحة.
async function sendHashToServerIfOptIn(hash) {
  // تحقق من موافقة المستخدم صراحة (مثال: قيمة من الإعدادات)
  const consent = await storageManager.get("userConsentSendHashes"); // يجب أن تتّبع هذه القيمة في إعدادات UI
  if (!consent) {
    console.warn("User has not consented to send hashes to server.");
    return;
  }

  try {
    // إرسال فقط عبر HTTPS و endpoint معتمد
    const resp = await fetch("https://api.example.com/hash", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hash }),
    });
    if (!resp.ok) throw new Error(`Server error ${resp.status}`);
    return await resp.json();
  } catch (err) {
    console.error("Failed to send hash:", err);
  }
}

// مثال استدعاء (يجب أن يُفعل فقط بعد موافقة المستخدم صريحة في UI)
// sendHashToServerIfOptIn('abcdef...');
