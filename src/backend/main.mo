import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  // Types
  type Product = {
    id : Nat;
    name : Text;
    priceINR : Nat;
    category : Text;
    collection : Text;
    description : Text;
    isBestseller : Bool;
    colors : [Text];
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  type CartItem = {
    product : Product;
    quantity : Nat;
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  // Pre-seeded products (20+)
  let productList : [Product] = [
    {
      id = 1;
      name = "Floral Georgette Gown";
      priceINR = 18000;
      category = "Evening Gowns";
      collection = "Western Wear";
      description = "Elegant floral georgette gown";
      isBestseller = true;
      colors = ["Pink", "Blue"];
    },
    {
      id = 2;
      name = "Anarkali Suit Set";
      priceINR = 15000;
      category = "Light Festive Wear";
      collection = "Indian Wear";
      description = "Traditional Anarkali suit with dupatta";
      isBestseller = false;
      colors = ["Maroon", "Green"];
    },
    {
      id = 3;
      name = "Satin Slip Dress";
      priceINR = 12000;
      category = "Dresses";
      collection = "Summer Wear";
      description = "Chic satin slip dress for summer outings";
      isBestseller = true;
      colors = ["Black", "Champagne"];
    },
    {
      id = 4;
      name = "Lehenga Choli Ensemble";
      priceINR = 25000;
      category = "Wedding Wear";
      collection = "Indian Wear";
      description = "Stunning lehenga choli with intricate embroidery";
      isBestseller = false;
      colors = ["Red", "Gold"];
    },
    {
      id = 5;
      name = "Co-Ord Set with Blazer";
      priceINR = 14000;
      category = "Co-Ord Sets";
      collection = "Western Wear";
      description = "Stylish co-ord set featuring a blazer";
      isBestseller = true;
      colors = ["Beige", "Navy Blue"];
    },
    {
      id = 6;
      name = "Custom Fit Gown";
      priceINR = 35000;
      category = "Custom Fits";
      collection = "Evening Gowns";
      description = "Designer custom fit gown for special occasions";
      isBestseller = false;
      colors = ["Emerald Green", "Royal Blue"];
    },
    {
      id = 7;
      name = "Saree with Designer Blouse";
      priceINR = 20000;
      category = "Light Festive Wear";
      collection = "Indian Wear";
      description = "Classic saree paired with designer blouse";
      isBestseller = true;
      colors = ["Peach", "Lavender"];
    },
    {
      id = 8;
      name = "Tiered Maxi Dress";
      priceINR = 11000;
      category = "Dresses";
      collection = "Summer Wear";
      description = "Flowy tiered maxi dress for summer days";
      isBestseller = false;
      colors = ["Yellow", "Mint Green"];
    },
    {
      id = 9;
      name = "Heavy Embroidered Lehenga";
      priceINR = 30000;
      category = "Wedding Wear";
      collection = "Indian Wear";
      description = "Exquisite heavy embroidered lehenga";
      isBestseller = false;
      colors = ["Magenta", "Silver"];
    },
    {
      id = 10;
      name = "Formal Evening Dress";
      priceINR = 17000;
      category = "Evening Gowns";
      collection = "Western Wear";
      description = "Elegant formal evening dress for galas";
      isBestseller = true;
      colors = ["Black", "Royal Blue"];
    },
    {
      id = 11;
      name = "Printed Kurta Set";
      priceINR = 10000;
      category = "Light Festive Wear";
      collection = "Indian Wear";
      description = "Vibrant printed kurta set with dupatta";
      isBestseller = false;
      colors = ["Pink", "Orange"];
    },
    {
      id = 12;
      name = "Chiffon Maxi Dress";
      priceINR = 13000;
      category = "Dresses";
      collection = "Summer Wear";
      description = "Lightweight chiffon maxi dress";
      isBestseller = true;
      colors = ["Powder Blue", "Lilac"];
    },
    {
      id = 13;
      name = "Designer Lehenga Set";
      priceINR = 27000;
      category = "Wedding Wear";
      collection = "Indian Wear";
      description = "Exclusive designer lehenga set";
      isBestseller = false;
      colors = ["Navy Blue", "Rose Gold"];
    },
    {
      id = 14;
      name = "Custom Evening Gown";
      priceINR = 22000;
      category = "Custom Fits";
      collection = "Evening Gowns";
      description = "Tailored custom evening gown";
      isBestseller = true;
      colors = ["Champagne", "Emerald Green"];
    },
    {
      id = 15;
      name = "Designer Crop Top & Skirt";
      priceINR = 16000;
      category = "Co-Ord Sets";
      collection = "Western Wear";
      description = "Trendy designer crop top paired with a skirt";
      isBestseller = false;
      colors = ["Peach", "Turquoise"];
    },
    {
      id = 16;
      name = "Custom Bridal Gown";
      priceINR = 40000;
      category = "Custom Fits";
      collection = "Wedding Wear";
      description = "Bespoke custom bridal gown for special occasions";
      isBestseller = false;
      colors = ["Ivory", "Champagne"];
    },
    {
      id = 17;
      name = "Sequin Party Dress";
      priceINR = 12000;
      category = "Dresses";
      collection = "Western Wear";
      description = "Sparkling sequin dress for parties";
      isBestseller = true;
      colors = ["Rose Gold", "Black"];
    },
    {
      id = 18;
      name = "Traditional Wedding Lehenga";
      priceINR = 35000;
      category = "Wedding Wear";
      collection = "Indian Wear";
      description = "Traditional wedding lehenga with intricate details";
      isBestseller = false;
      colors = ["Red", "Gold"];
    },
    {
      id = 19;
      name = "Custom Tailored Suit";
      priceINR = 25000;
      category = "Custom Fits";
      collection = "Evening Gowns";
      description = "Expertly tailored custom fit suit";
      isBestseller = true;
      colors = ["Midnight Blue", "Charcoal Grey"];
    },
    {
      id = 20;
      name = "Designer Shararas";
      priceINR = 18000;
      category = "Light Festive Wear";
      collection = "Indian Wear";
      description = "Designer shararas for festive occasions";
      isBestseller = false;
      colors = ["Powder Blue", "Peach"];
    },
    {
      id = 21;
      name = "Silk Lehenga Choli";
      priceINR = 33000;
      category = "Wedding Wear";
      collection = "Indian Wear";
      description = "Luxurious silk lehenga choli set";
      isBestseller = true;
      colors = ["Royal Blue", "Silver"];
    },
    {
      id = 22;
      name = "Custom Western Suit";
      priceINR = 28000;
      category = "Custom Fits";
      collection = "Western Wear";
      description = "Custom tailored western suit";
      isBestseller = false;
      colors = ["Charcoal Grey", "Midnight Blue"];
    },
    {
      id = 23;
      name = "Boho Maxi Dress";
      priceINR = 10000;
      category = "Dresses";
      collection = "Summer Wear";
      description = "Bohemian-style maxi dress for summer adventures";
      isBestseller = true;
      colors = ["Beige", "Mint Green"];
    },
    {
      id = 24;
      name = "Jacket Co-Ord Set";
      priceINR = 19000;
      category = "Co-Ord Sets";
      collection = "Western Wear";
      description = "Chic co-ord set with a statement jacket";
      isBestseller = false;
      colors = ["Blush Pink", "Sage Green"];
    },
  ];

  // Persistent storage for shopping carts and contact submissions
  let carts = Map.empty<Principal, [CartItem]>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  var nextContactId = 1;

  // Product Management (Read-Only)
  public query ({ caller }) func getAllProducts() : async [Product] {
    productList.sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    productList.filter(func(p) { Text.equal(p.category, category) });
  };

  public query ({ caller }) func getProductsByCollection(collection : Text) : async [Product] {
    productList.filter(func(p) { Text.equal(p.collection, collection) });
  };

  public query ({ caller }) func getBestsellers() : async [Product] {
    productList.filter(func(p) { p.isBestseller });
  };

  public query ({ caller }) func getProductById(id : Nat) : async ?Product {
    productList.find(func(p) { p.id == id });
  };

  // Shopping Cart Management
  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (quantity == 0) { Runtime.trap("Quantity must be greater than 0") };
    let product = switch (productList.find(func(p) { p.id == productId })) {
      case (null) { Runtime.trap("Product not found") };
      case (?p) { p };
    };

    let currentCart = switch (carts.get(caller)) {
      case (null) { [{ product; quantity }] };
      case (?cart) {
        let existingItemOpt = cart.find(func(item) { item.product.id == productId });
        switch (existingItemOpt) {
          case (null) {
            cart.concat([{ product; quantity }]);
          };
          case (?existingItem) {
            cart.map(
              func(item) {
                if (item.product.id == productId) {
                  { item with quantity = existingItem.quantity + quantity };
                } else {
                  item;
                };
              }
            );
          };
        };
      };
    };

    carts.add(caller, currentCart);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    let currentCart = switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) { cart };
    };

    let filteredCart = currentCart.filter(func(item) { item.product.id != productId });

    carts.add(caller, filteredCart);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    carts.remove(caller);
  };

  // Contact Form Submission
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async Nat {
    let newSubmission : ContactSubmission = {
      name;
      email;
      phone;
      message;
    };
    contactSubmissions.add(nextContactId, newSubmission);
    let currentId = nextContactId;
    nextContactId += 1;
    currentId;
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.values().toArray();
  };

  // Utility function to clear cart (after order placement)
  public shared ({ caller }) func cartClear() : async () {
    carts.remove(caller);
  };
};
