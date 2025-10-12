import React from 'react';

const Accueil = () => {
    return (
<main className="font-sans text-gray-800">
          {/* Hero Section */}
          <section className="bg-gray-100 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Bienvenue sur Philae Design</h1>
            <img 
              src="/assets/roue.png" 
              alt="Roue des 3 Univers" 
              className="mx-auto mb-6 max-w-full h-auto" 
              style={{ maxHeight: '600px' }}
            />
            <p className="text-lg max-w-2xl mx-auto mb-4">
              Des lignes simples pour une beauté universelle. La forme et la fonction réunies dans un meuble unique.
            </p>
            <p className="text-lg max-w-2xl mx-auto mb-4">
              Le design Philae naît de la géométrie des solides de Platon, où les arêtes sont toutes semblables.
            </p>
            <p className="text-lg max-w-2xl mx-auto mb-4">
              L'ossature des meubles est composée d'arêtes en bois, qui s’assemblent en un design intemporel.
            </p>
            <p className="text-lg max-w-2xl mx-auto mb-4">
              Configurable, chaque pièce célèbre l’authenticité de votre intérieur. Créez, configurez, personnalisez.
            </p>
            <p className="text-lg max-w-2xl mx-auto mb-6">
              Que ce soit une table, une lampe ou une œuvre sur mesure, Philae transforme des contraintes parfaites en créations qui vous ressemblent, sans limite autre que votre imagination.
            </p>
            <img 
              src="/assets/logo_PHILAE.jpg" 
              alt="Logo Philae Design" 
              className="mx-auto max-w-full h-auto" 
              style={{ maxHeight: '200px' }}
            />
          </section>

          {/* Eco-Responsible Features Section */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Nos Engagements</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <img src="/assets/eco-icon.png" alt="Éco-responsable" className="mx-auto mb-4 h-16" />
                  <p className="font-semibold">Éco-responsable</p>
                  <p>Bois certifiés FSC pour une production durable.</p>
                </div>
                <div>
                  <img src="/assets/innovation-icon.png" alt="Innovation française" className="mx-auto mb-4 h-16" />
                  <p className="font-semibold">Innovation française</p>
                  <p>Conceptions brevetées, fabriquées en France.</p>
                </div>
                <div>
                  <img src="/assets/wood-icon.png" alt="Bois certifiés" className="mx-auto mb-4 h-16" />
                  <p className="font-semibold">Matériaux de qualité</p>
                  <p>Bois sélectionnés pour une finition irréprochable.</p>
                </div>
                <div>
                  <img src="/assets/assembly-icon.png" alt="Montage rapide" className="mx-auto mb-4 h-16" />
                  <p className="font-semibold">Montage rapide</p>
                  <p>Assemblage sans outil en quelques minutes.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Nos Meilleures Créations</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <img src="/assets/product1.jpg" alt="Table Philae" className="mx-auto mb-4 h-48 w-full object-cover" />
                  <p className="font-semibold">Table Philae</p>
                  <p>Salon</p>
                </div>
                <div className="text-center">
                  <img src="/assets/product2.jpg" alt="Lampe Philae" className="mx-auto mb-4 h-48 w-full object-cover" />
                  <p className="font-semibold">Lampe Philae</p>
                  <p>Entrée</p>
                </div>
                <div className="text-center">
                  <img src="/assets/product3.jpg" alt="Suspension Philae" className="mx-auto mb-4 h-48 w-full object-cover" />
                  <p className="font-semibold">Suspension Philae</p>
                  <p>Cuisine</p>
                </div>
                <div className="text-center">
                  <img src="/assets/product4.jpg" alt="Œuvre Philae" className="mx-auto mb-4 h-48 w-full object-cover" />
                  <p className="font-semibold">Œuvre Philae</p>
                  <p>Chambre</p>
                </div>
              </div>
            </div>
          </section>

          {/* Assembly Process Section */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Un Montage Facile et Intuitif</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <img src="/assets/step1.jpg" alt="Étape 1" className="mx-auto mb-4 h-32" />
                  <p>Recevez votre meuble à plat.</p>
                </div>
                <div>
                  <img src="/assets/step2.jpg" alt="Étape 2" className="mx-auto mb-4 h-32" />
                  <p>Positionnez les encoches dans les espaces prévus.</p>
                </div>
                <div>
                  <img src="/assets/step3.jpg" alt="Étape 3" className="mx-auto mb-4 h-32" />
                  <p>Assemblez et voyez votre meuble prendre forme.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Customization Section */}
          <section className="py-16 bg-gray-100">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-12">Personnalisez Votre Style</h2>
              <p className="text-lg max-w-2xl mx-auto mb-6">
                La gamme Philae propose une diversité de meubles et luminaires, des tables imposantes aux lampes élégantes. 
                Personnalisez vos finitions pour une touche unique.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <img src="/assets/custom-size.png" alt="Taille sur-mesure" className="mx-auto mb-4 h-16" />
                  <p className="font-semibold">Taille sur-mesure</p>
                </div>
                <div>
                  <img src="/assets/custom-color.png" alt="Nuancier d’exception" className="mx-auto mb-4 h-16" />
                  <p className="font-semibold">Nuancier d’exception</p>
                </div>
                <div>
                  <img src="/assets/custom-design.png" alt="Conçu pour vous" className="mx-auto mb-4 h-16" />
                  <p className="font-semibold">Conçu juste pour vous</p>
                </div>
              </div>
            </div>
          </section>

          {/* Professional Collaboration Section */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-12">Collaborez avec Nous</h2>
              <p className="text-lg max-w-2xl mx-auto mb-6">
                Vous êtes un professionnel de la décoration d’intérieur ? 
                Notre équipe dédiée se tient à votre disposition pour des projets sur mesure.
              </p>
              <button className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700">
                Contactez-nous
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <p className="mb-4">Innovation française | Garantie 2 ans | Livraison gratuite à partir de 299€</p>
              <p>#philae_design</p>
            </div>
          </footer>
        </main>
    );
};

export default Accueil;