import React from 'react';

const Boutique = () => {
    return (
        <main>
            <h1>Notre Boutique</h1>
            <div className="produits" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {/* Exemple de produit – ajoute des images réelles dans public/assets/ */}
                <div className="produit" style={{ margin: '10px', padding: '10px', border: '1px solid #ddd', width: '200px' }}>
                    <img src="/assets/produit1.jpg" alt="Produit 1" style={{ width: '100%' }} />
                    <p>Produit 1 - 50€</p>
                    <button>Ajouter au panier</button>
                </div>
                <div className="produit" style={{ margin: '10px', padding: '10px', border: '1px solid #ddd', width: '200px' }}>
                    <img src="/assets/produit2.jpg" alt="Produit 2" style={{ width: '100%' }} />
                    <p>Produit 2 - 75€</p>
                    <button>Ajouter au panier</button>
                </div>
                {/* Ajoute plus de produits ici */}
            </div>
        </main>
    );
};

export default Boutique;