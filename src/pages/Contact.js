import React from 'react';

const Contact = () => {
    return (
        <main>
            <h1>Contactez-nous</h1>
            <form action="mailto:tonemail@philae.design" method="post" encType="text/plain" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <label htmlFor="nom">Nom :</label><br />
                <input type="text" id="nom" name="nom" style={{ width: '100%', marginBottom: '10px' }} /><br />
                <label htmlFor="email">Email :</label><br />
                <input type="email" id="email" name="email" style={{ width: '100%', marginBottom: '10px' }} /><br />
                <label htmlFor="message">Message :</label><br />
                <textarea id="message" name="message" rows="5" style={{ width: '100%', marginBottom: '10px' }}></textarea><br />
                <button type="submit">Envoyer</button>
            </form>
        </main>
    );
};

export default Contact;