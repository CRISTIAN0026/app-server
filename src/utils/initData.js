import Category from "../models/category.js";

const categories = [
  "Electrónicos",
  "Ropa",
  "Alimentos",
  "Bebidas",
  "Muebles",
  "Juguetes",
  "Libros",
  "Deportes",
  "Belleza",
  "Salud",
  "Jardín",
  "Hogar",
  "Oficina",
  "Automóviles",
  "Mascotas",
  "Bebés",
  "Música",
  "Películas",
  "Videojuegos",
  "Arte",
  "Accesorios",
  "Antigüedades",
  "Artesanías",
  "Bicicletas",
  "Cámaras",
  "Camping",
  "Coleccionables",
  "Computadoras",
  "Cosméticos",
  "Decoración",
  "Electrodomésticos",
  "Equipo de oficina",
  "Equipo de sonido",
  "Fitness",
  "Herramientas",
  "Instrumentos musicales",
  "Joyas",
  "Juegos de mesa",
  "Libros de texto",
  "Materiales de construcción",
  "Motos",
  "Productos de limpieza",
  "Productos de peluquería",
  "Productos orgánicos",
  "Ropa de cama",
  "Ropa de deporte",
  "Suministros de jardinería",
  "Suministros de pintura",
  "Suministros para mascotas",
  "Zapatos",
];

export async function initCategories() {
  for (const name of categories) {
    const existingCategory = await Category.findOne({ name });
    if (!existingCategory) {
      const newCategory = new Category({ name });
      await newCategory.save();
    }
  }
}
