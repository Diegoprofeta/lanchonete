import { Product, DeliveryArea, Testimonial, AppTheme } from './types';

export const PRODUCTS: Record<AppTheme, Product[]> = {
  [AppTheme.CLASSIC]: [
    {
      id: 'c-burger-1',
      name: 'X-Salada Tradicional',
      description: 'O clássico hambúrguer artesanal de 120g na chapa, queijo prato derretido, alface fresca, tomate fatiado e a famosa maionese verde da casa no pão brioche selado.',
      price: 18.90,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
      category: 'burgers',
      isBestSeller: true,
      ingredients: ['Hambúrguer 120g', 'Queijo Prato', 'Alface', 'Tomate', 'Maionese Verde', 'Pão Brioche']
    },
    {
      id: 'c-burger-2',
      name: 'X-Tudo do Bairro',
      description: 'Lanche generoso com hambúrguer chapa de 120g, queijo, presunto, bacon crocante, ovo na chapa, alface, tomate, milho, batata palha e maionese artesanal.',
      price: 26.90,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
      category: 'burgers',
      ingredients: ['Hambúrguer 120g', 'Queijo', 'Presunto', 'Bacon', 'Ovo', 'Alface', 'Tomate', 'Milho', 'Batata Palha', 'Maionese']
    },
    {
      id: 'c-dog-1',
      name: 'Cachorro Quente Clássico',
      description: 'Duas salsichas de alta qualidade cozidas no molho de tomate caseiro com pimentão, milho, ervilha, batata palha crocante e purê de batatas cremoso da Vovó no pão de hot dog macio.',
      price: 15.00,
      image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=600&auto=format&fit=crop&q=80',
      category: 'dogs',
      isBestSeller: true,
      ingredients: ['2 Salsichas', 'Molho Caseiro', 'Milho', 'Ervilha', 'Purê de Batata', 'Batata Palha', 'Pão de Hot Dog']
    },
    {
      id: 'c-combo-1',
      name: 'Combo Casal Feliz',
      description: '2 X-Saladas Tradicionais + 1 Batata Frita Média sequinha + 1 Coca-Cola 2 Litros geladíssima.',
      price: 49.90,
      originalPrice: 62.80,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80',
      category: 'combos',
      isBestSeller: true,
      ingredients: ['2 X-Saladas', '1 Batata M', '1 Coca-Cola 2L'],
      savings: 12.90
    },
    {
      id: 'c-combo-2',
      name: 'Combo Família unida',
      description: '3 X-Tudo do Bairro + 1 Batata Frita Grande com cheddar + 1 Guaraná Antarctica 2L.',
      price: 89.90,
      originalPrice: 109.60,
      image: 'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=600&auto=format&fit=crop&q=80',
      category: 'combos',
      ingredients: ['3 X-Tudos', '1 Batata G Cheddar', '1 Guaraná 2L'],
      savings: 19.70
    },
    {
      id: 'c-drink-1',
      name: 'Coca-Cola 2L',
      description: 'Garrafa pet de 2L bem gelada para acompanhar seu lanche em família.',
      price: 11.00,
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80',
      category: 'drinks',
      ingredients: ['Refrigerante Cola 2L']
    },
    {
      id: 'c-drink-2',
      name: 'Suco de Laranja Copo 500ml',
      description: 'Suco natural de laranja, espremido na hora, super refrescante e sem conservantes.',
      price: 8.50,
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&auto=format&fit=crop&q=80',
      category: 'drinks',
      ingredients: ['Laranja Pura', 'Gelo']
    }
  ],
  [AppTheme.URBAN]: [
    {
      id: 'u-burger-1',
      name: 'Smash Neon',
      description: 'Hambúrguer smash prensado na chapa ultra-quente de 90g com crostinha perfeita, queijo cheddar americano derretido, picles crocantes, cebola picadinha e molho secreto neon no pão brioche dourado.',
      price: 16.90,
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&auto=format&fit=crop&q=80',
      category: 'burgers',
      isBestSeller: true,
      ingredients: ['Smash Burger 90g', 'Cheddar Americano', 'Picles', 'Cebola', 'Molho Secreto Neon', 'Pão Brioche']
    },
    {
      id: 'u-burger-2',
      name: 'Double Midnight',
      description: 'Para os guerreiros da noite! Dois bifes smash de 100g com muita crostinha, muito bacon artesanal defumado crocante, fatias generosas de queijo cheddar e molho barbecue artesanal.',
      price: 29.90,
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
      category: 'burgers',
      ingredients: ['Double Smash 100g', 'Cheddar Americano Dobrado', 'Bacon Defumado', 'Molho Barbecue', 'Pão Australiano']
    },
    {
      id: 'u-side-1',
      name: 'Batata Rústica Cheddar & Bacon',
      description: 'Batatas fritas rústicas cortadas em gomos grossos com casca, temperadas com páprica defumada, cobertas com calda cremosa de cheddar e bacon artesanal crocante picado.',
      price: 19.90,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80',
      category: 'sides',
      isBestSeller: true,
      ingredients: ['Batata com Casca', 'Páprica', 'Cheddar Cremoso', 'Crispy de Bacon']
    },
    {
      id: 'u-combo-1',
      name: 'Combo Universitário',
      description: '1 Burger Smash Neon + 1 Batata Rústica Pequena + 1 Soda Lata bem gelada. O salva-vidas do estudante.',
      price: 28.90,
      originalPrice: 35.80,
      image: 'https://images.unsplash.com/photo-1549611016-3a70d82b5040?w=600&auto=format&fit=crop&q=80',
      category: 'combos',
      isBestSeller: true,
      ingredients: ['Smash Neon', 'Batata Rústica P', 'Soda Lata'],
      savings: 6.90
    },
    {
      id: 'u-combo-2',
      name: 'Combo da Madruga',
      description: '2 Double Midnight + 1 Batata Rústica Grande Cheddar & Bacon + 2 Refris em Lata. Energia para virar a noite!',
      price: 69.90,
      originalPrice: 89.70,
      image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=600&auto=format&fit=crop&q=80',
      category: 'combos',
      ingredients: ['2 Double Midnight', 'Batata Rústica G', '2 Refris Lata'],
      savings: 19.80
    },
    {
      id: 'u-drink-1',
      name: 'Guaraná Antarctica Lata',
      description: 'Lata de 350ml trincando de gelada.',
      price: 5.50,
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80',
      category: 'drinks',
      ingredients: ['Guaraná Lata 350ml']
    }
  ],
  [AppTheme.PODRAO]: [
    {
      id: 'p-burger-1',
      name: 'Monstro X-Tudo de 4 Carnes',
      description: 'Um verdadeiro monumento! 4 carnes smash de 100g, queijo duplo em todas as camadas, presunto duplo, muito bacon defumado, calabresa fatiada na chapa, 2 ovos fritos, alface, tomate, milho, batata palha, maionese temperada e pão gigante prensado.',
      price: 34.90,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
      category: 'burgers',
      isBestSeller: true,
      ingredients: ['4 Carnes 100g', 'Queijo Duplo', 'Presunto Duplo', 'Bacon Turbinado', 'Calabresa Chapa', '2 Ovos Fritos', 'Alface e Tomate', 'Milho', 'Batata Palha', 'Pão Gigante']
    },
    {
      id: 'p-burger-2',
      name: 'X-Calabresa Turbinado',
      description: 'Hambúrguer artesanal de 120g na chapa, coberto com uma montanha de linguiça calabresa acebolada bem douradinha, queijo prato derretido, alface, tomate e maionese verde da chapa.',
      price: 22.50,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
      category: 'burgers',
      ingredients: ['Hambúrguer 120g', 'Calabresa Acebolada', 'Queijo Prato', 'Maionese Verde', 'Alface e Tomate']
    },
    {
      id: 'p-dog-1',
      name: 'Dogão Prensado Duas Salsichas',
      description: 'O verdadeiro podrão das ruas! Duas salsichas abertas na chapa, bacon crocante, calabresa picadinha, queijo derretido, vinagrete fresco, milho, ervilha, batata palha, purê cremoso e ketchup/mostarda. Tudo prensado na chapa com manteiga.',
      price: 17.50,
      image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=600&auto=format&fit=crop&q=80',
      category: 'dogs',
      isBestSeller: true,
      ingredients: ['2 Salsichas Chapa', 'Bacon picado', 'Calabresa picada', 'Queijo', 'Vinagrete', 'Batata Palha', 'Purê de batata', 'Prensado na Manteiga']
    },
    {
      id: 'p-side-1',
      name: 'Balde de Batata com Calabresa',
      description: 'Um balde gigante de 750g repleto de batatas fritas super crocantes por fora e macias por dentro, cobertas com muita linguiça calabresa fatiada acebolada na chapa e calda de cheddar quente.',
      price: 24.90,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80',
      category: 'sides',
      ingredients: ['750g Batata Frita', 'Calabresa Acebolada', 'Cheddar Quente']
    },
    {
      id: 'p-combo-1',
      name: 'Combo Enche-Bucho',
      description: '1 Monstro X-Tudo de 4 Carnes + 1 Meia Porção de Batata com Calabresa + 1 Refrigerante Litrão bem gelado.',
      price: 49.90,
      originalPrice: 62.90,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80',
      category: 'combos',
      isBestSeller: true,
      ingredients: ['Monstro 4 Carnes', 'Meia Porção Batata Calabresa', 'Refri Litrão'],
      savings: 13.00
    },
    {
      id: 'p-drink-1',
      name: 'Tubosa Guaraná Convenção 2L',
      description: 'A clássica Tubosa gelada do bairro para acompanhar o podrão de respeito.',
      price: 8.00,
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80',
      category: 'drinks',
      ingredients: ['Tubosa Convenção 2L']
    }
  ]
};

export const DELIVERY_AREAS: DeliveryArea[] = [
  { name: 'Rua Bahia (Centro do Bairro)', fee: 3.00, timeEstimate: '15-25 min' },
  { name: 'Avenida Central', fee: 4.00, timeEstimate: '20-30 min' },
  { name: 'Rua dos Pinheiros', fee: 5.00, timeEstimate: '25-35 min' },
  { name: 'Rua das Flores', fee: 5.50, timeEstimate: '25-40 min' },
  { name: 'Rua de Trás (Limites do Bairro)', fee: 7.00, timeEstimate: '30-45 min' },
  { name: 'Retirada no Balcão (Rua Paraíba, 420)', fee: 0.00, timeEstimate: '10-15 min' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Carlos S.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    role: 'Morador há 5 anos da Rua Bahia',
    text: 'Melhor X-Salada da região, chega sempre quentinho e antes do tempo estimado! A maionese verde deles é espetacular, peço todo final de semana sem falta.',
    stars: 5
  },
  {
    id: 't-2',
    name: 'Mariana Lima',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    role: 'Estudante da Avenida Central',
    text: 'Amo os combos de Smash Burger quando estou estudando de madrugada. É rápido, barato e mata a fome de verdade. O Combo Universitário é o meu salva-vidas!',
    stars: 5
  },
  {
    id: 't-3',
    name: 'Seu Jorge',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    role: 'Morador da Rua dos Pinheiros',
    text: 'Cachorro quente muito bem servido e o purê é de verdade! Lanche com fartura que agrada a família inteira. A entrega é super simpática e o motoboy já conhece a gente.',
    stars: 5
  }
];
