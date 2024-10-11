

export default function recherchePartielle(tableau: string[], terme: string): string[] {
    // Utilise filter() et includes() pour rechercher les correspondances partielles
    return tableau.filter((element) => element.includes(terme));
}
