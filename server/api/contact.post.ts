import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
    // 1. Récupérer les données envoyées par le formulaire
    const body = await readBody(event);
    const { name, email, subject, message } = body;

    // 2. Vérification simple
    if (!name || !email || !message) {
        throw createError({
            statusCode: 400,
            statusMessage: "Champs manquants",
        });
    }

    // 3. Récupérer les secrets depuis la config runtime
    const config = useRuntimeConfig();

    // 4. Configurer le transporteur (Gmail exemple)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.gmailUser,
            pass: config.gmailPass, // Mot de passe d'application
        },
    });

    // 5. Préparer l'email
    const mailOptions = {
        from: `Portfolio Contact <${config.gmailUser}>`,
        to: config.gmailUser, // Vous vous l'envoyez à vous-même
        replyTo: email, // Pour répondre au visiteur
        subject: `[Portfolio] ${subject || "Nouveau message"}`,
        text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
            <h3>Nouveau message de ${name}</h3>
            <p><strong>Email:</strong> ${email}</p>
            <hr>
            <p>${message.replace(/\n/g, "<br>")}</p>
        `,
    };

    // 6. Envoyer
    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: "Email envoyé" };
    } catch (error) {
        console.error("Erreur SMTP:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Erreur lors de l'envoi de l'email",
        });
    }
});
