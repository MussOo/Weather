# Application Météo en Next.js

![image](https://github.com/user-attachments/assets/8eba65d7-5165-4694-8721-ed100c341be0)

Ce projet est une **application météo** développée avec **Next.js** pour le framework frontend et **Tailwind CSS** pour le style. Elle permet de rechercher la météo dans diverses villes du monde en utilisant plusieurs **API externes** pour récupérer les données nécessaires, comme les coordonnées des villes, les prévisions météo et les informations sur les pays et villes.

## Fonctionnalités

- **Recherche de la météo par ville** : Permet de saisir le nom d'une ville et d'obtenir des informations météorologiques précises pour cette ville.
![image](https://github.com/user-attachments/assets/272433c6-1bcb-4c1e-a7c7-84bce542c396)
![image](https://github.com/user-attachments/assets/010b288e-f223-4411-b50a-a63894f7e51e)
![image](https://github.com/user-attachments/assets/219996b1-e62d-4bf1-8954-53f05b2e594d)

- **Prédictions météo** : Affiche les conditions météo actuelles ainsi que les prévisions pour la ville sélectionnée.
![image](https://github.com/user-attachments/assets/8bbe29ce-f1b0-4ec0-a947-d16bce8ec049)
![image](https://github.com/user-attachments/assets/f22ac2cc-a4ba-45b3-a67e-abee29039acc)

- **Liste des pays et des villes** : Propose une liste dynamique des pays et des villes à sélectionner, facilitant la navigation pour l'utilisateur.

## APIs Utilisées

- [**OpenWeather**](https://openweathermap.org/) : Pour récupérer les **coordonnées géographiques** (latitude et longitude) des villes.
- [**Tomorrow.io**](https://www.tomorrow.io/) : Pour obtenir les **données météorologiques détaillées** (température, humidité, précipitations, etc.) à partir des coordonnées géographiques.
- **API First.org** : Fournit une **liste des pays** afin de permettre à l'utilisateur de choisir un pays spécifique.
- [**CountriesNow.space**](https://countriesnow.space/) : Pour obtenir la **liste des villes** associées à chaque pays, utilisée dans l'interface pour la recherche par ville.

## Technologies utilisées

- **Next.js** : Framework React pour le rendu côté serveur (SSR) et la génération de sites statiques (SSG).
- **Tailwind CSS** : Utilisé pour le design rapide et réactif de l'interface utilisateur.
- **APIs externes** : Pour l'intégration des données en temps réel et la gestion des informations météorologiques et géographiques.

## Installation

Pour exécuter ce projet en local, suivez les étapes ci-dessous :

1. Clonez le dépôt :
    
    ```
    git clone https://github.com/MussOo/Weather.git
    ```
    
2. Accédez au répertoire du projet :

```bash
cd Weather
```

1. Installez les dépendances :

```bash
npm install
```

1. Créez un fichier `.env.local` à la racine du projet avec vos clés d'API :

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=VotreCléAPI
NEXT_PUBLIC_TOMORROW_IO_API_KEY=VotreCléAPI
```

1. Lancez l'application :

```bash
npm run dev
```

1. Accédez à l'application dans votre navigateur à l'adresse suivante :

```
http://localhost:3000
```

## Utilisation

1. Sélectionnez un **pays** dans le menu déroulant.
2. Sélectionnez ensuite une **ville** disponible dans la liste des villes du pays sélectionné.
3. L'application affichera la météo actuelle et les prévisions pour la ville choisie.

## Améliorations futures

Voici quelques améliorations potentielles à apporter au projet :

- Intégration d'un **système de géolocalisation** pour détecter automatiquement la position de l'utilisateur.
- **Sauvegarde des villes favorites** pour un accès rapide aux informations météorologiques.
- Ajout d'une **gestion multilingue** pour rendre l'application accessible à un plus large public.

## Contributions

Les contributions sont bienvenues ! Si vous avez des suggestions, des corrections ou des améliorations, n'hésitez pas à soumettre une **pull request**.

## Licence

Ce projet est sous licence MIT. Pour plus de détails, consultez le fichier LICENSE.
