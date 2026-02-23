import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  public type ProductType = {
    #plant;
    #pot;
    #propagation;
  };

  public type ProductStatus = {
    #active;
    #outOfStock;
    #discontinued;
  };

  public type Product = {
    id : Nat;
    name : Text;
    productType : ProductType;
    category : ?Text;
    size : ?Text;
    color : ?Text;
    potType : ?Text;
    propagationType : ?Text;
    parentPlant : ?Nat;
    purchasePrice : Float;
    sellingPrice : Float;
    stockQty : Nat;
    image : ?Text;
    dateAdded : Time.Time;
    status : ProductStatus;
  };

  public type SaleItem = {
    productId : Nat;
    productName : Text;
    quantity : Nat;
    price : Float;
    total : Float;
  };

  public type Sale = {
    billNo : Text;
    date : Time.Time;
    customerName : ?Text;
    customerPhone : ?Text;
    isWalkIn : Bool;
    items : [SaleItem];
    subtotal : Float;
    discount : Float;
    discountReason : ?Text;
    totalPaid : Float;
    paymentMode : Text;
    savedMessage : ?Text;
  };

  public type DeadPlant = {
    date : Time.Time;
    productId : Nat;
    productName : Text;
    deadQuantity : Nat;
    purchasePriceEach : Float;
    totalLoss : Float;
    reason : Text;
    notes : ?Text;
    photo : ?Text;
  };

  public type Expense = {
    date : Time.Time;
    category : Text;
    description : Text;
    amount : Float;
    paymentMode : Text;
  };

  public type Worker = {
    name : Text;
    phone : Text;
    salary : Float;
    joinDate : Time.Time;
    payments : [WorkerPayment];
  };

  public type WorkerPayment = {
    date : Time.Time;
    amount : Float;
    paymentMode : Text;
  };

  public type Customer = {
    name : Text;
    phone : Text;
    totalPurchases : Nat;
    totalSpent : Float;
    totalDiscount : Float;
  };

  let products = Map.empty<Nat, Product>();
  let sales = Map.empty<Text, Sale>();
  let deadPlants = Map.empty<Nat, DeadPlant>();
  let expenses = Map.empty<Nat, Expense>();
  let workers = Map.empty<Nat, Worker>();
  let customers = Map.empty<Text, Customer>();

  var productIdCounter = 0;
  var expenseIdCounter = 0;
  var deadPlantIdCounter = 0;
  var workerIdCounter = 0;

  // Plant CRUD operations
  public shared ({ caller }) func addPlant(
    name : Text,
    category : ?Text,
    purchasePrice : Float,
    sellingPrice : Float,
    stockQty : Nat,
    image : ?Text,
  ) : async Nat {
    productIdCounter += 1;
    let product : Product = {
      id = productIdCounter;
      name;
      productType = #plant;
      category;
      size = null;
      color = null;
      potType = null;
      propagationType = null;
      parentPlant = null;
      purchasePrice;
      sellingPrice;
      stockQty;
      image;
      dateAdded = Time.now();
      status = #active;
    };
    products.add(product.id, product);
    product.id;
  };

  public shared ({ caller }) func updatePlant(id : Nat, name : Text, category : ?Text, purchasePrice : Float, sellingPrice : Float, stockQty : Nat, image : ?Text) : async () {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        products.add(id, { product with
          name;
          category;
          purchasePrice;
          sellingPrice;
          stockQty;
          image;
        });
      };
    };
  };

  public shared ({ caller }) func deletePlant(id : Nat) : async () {
    if (not products.containsKey(id)) { Runtime.trap("Product not found") };
    products.remove(id);
  };

  public query ({ caller }) func getAllPlants() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getLowStockPlants() : async [Product] {
    let lowStock = List.empty<Product>();
    products.values().forEach(
      func(product) {
        if (product.stockQty < 5) {
          lowStock.add(product);
        };
      }
    );
    lowStock.toArray();
  };

  // Pot CRUD operations
  public shared ({ caller }) func addPot(name : Text, size : Text, color : Text, potType : Text, purchasePrice : Float, sellingPrice : Float, stockQty : Nat, image : ?Text) : async Nat {
    productIdCounter += 1;
    let product : Product = {
      id = productIdCounter;
      name;
      productType = #pot;
      category = null;
      size = ?size;
      color = ?color;
      potType = ?potType;
      propagationType = null;
      parentPlant = null;
      purchasePrice;
      sellingPrice;
      stockQty;
      image;
      dateAdded = Time.now();
      status = #active;
    };
    products.add(product.id, product);
    product.id;
  };

  public shared ({ caller }) func updatePot(id : Nat, name : Text, size : Text, color : Text, potType : Text, purchasePrice : Float, sellingPrice : Float, stockQty : Nat, image : ?Text) : async () {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        products.add(id, { product with
          name;
          size = ?size;
          color = ?color;
          potType = ?potType;
          purchasePrice;
          sellingPrice;
          stockQty;
          image;
        });
      };
    };
  };

  public shared ({ caller }) func deletePot(id : Nat) : async () {
    if (not products.containsKey(id)) { Runtime.trap("Product not found") };
    products.remove(id);
  };

  public query ({ caller }) func getAllPots() : async [Product] {
    let pots = List.empty<Product>();
    products.values().forEach(
      func(product) {
        if (product.productType == #pot) {
          pots.add(product);
        };
      }
    );
    pots.toArray();
  };

  // Propagation Plant CRUD operations
  public shared ({ caller }) func addPropagationPlant(
    name : Text,
    propagationType : Text,
    parentPlant : Nat,
    actualCost : Float,
    sellingPrice : Float,
    stockQty : Nat,
    image : ?Text,
  ) : async Nat {
    productIdCounter += 1;
    let product : Product = {
      id = productIdCounter;
      name;
      productType = #propagation;
      category = null;
      size = null;
      color = null;
      potType = null;
      propagationType = ?propagationType;
      parentPlant = ?parentPlant;
      purchasePrice = actualCost;
      sellingPrice;
      stockQty;
      image;
      dateAdded = Time.now();
      status = #active;
    };
    products.add(product.id, product);
    product.id;
  };

  public shared ({ caller }) func updatePropagationPlant(id : Nat, name : Text, propagationType : Text, parentPlant : Nat, actualCost : Float, sellingPrice : Float, stockQty : Nat, image : ?Text) : async () {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        products.add(id, { product with
          name;
          propagationType = ?propagationType;
          parentPlant = ?parentPlant;
          purchasePrice = actualCost;
          sellingPrice;
          stockQty;
          image;
        });
      };
    };
  };

  public shared ({ caller }) func deletePropagationPlant(id : Nat) : async () {
    if (not products.containsKey(id)) { Runtime.trap("Product not found") };
    products.remove(id);
  };

  public query ({ caller }) func getAllPropagationPlants() : async [Product] {
    let propagationPlants = List.empty<Product>();
    products.values().forEach(
      func(product) {
        if (product.productType == #propagation) {
          propagationPlants.add(product);
        };
      }
    );
    propagationPlants.toArray();
  };

  // Expenses CRUD operations
  public shared ({ caller }) func addExpense(date : Time.Time, category : Text, description : Text, amount : Float, paymentMode : Text) : async Nat {
    expenseIdCounter += 1;
    let expense : Expense = {
      date;
      category;
      description;
      amount;
      paymentMode;
    };
    expenses.add(expenseIdCounter, expense);
    expenseIdCounter;
  };

  public query ({ caller }) func getAllExpenses() : async [Expense] {
    expenses.values().toArray();
  };

  // Sales CRUD operations
  public shared ({ caller }) func createSale(billNo : Text, date : Time.Time, customerName : ?Text, customerPhone : ?Text, isWalkIn : Bool, items : [SaleItem], subtotal : Float, discount : Float, discountReason : ?Text, totalPaid : Float, paymentMode : Text, savedMessage : ?Text) : async () {
    let sale : Sale = {
      billNo;
      date;
      customerName;
      customerPhone;
      isWalkIn;
      items;
      subtotal;
      discount;
      discountReason;
      totalPaid;
      paymentMode;
      savedMessage;
    };
    sales.add(billNo, sale);
  };

  public query ({ caller }) func getAllSales() : async [Sale] {
    sales.values().toArray();
  };

  // Dead Plants CRUD operations
  public shared ({ caller }) func addDeadPlant(date : Time.Time, productId : Nat, productName : Text, deadQuantity : Nat, purchasePriceEach : Float, totalLoss : Float, reason : Text, notes : ?Text, photo : ?Text) : async Nat {
    deadPlantIdCounter += 1;
    let deadPlant : DeadPlant = {
      date;
      productId;
      productName;
      deadQuantity;
      purchasePriceEach;
      totalLoss;
      reason;
      notes;
      photo;
    };
    deadPlants.add(deadPlantIdCounter, deadPlant);
    deadPlantIdCounter;
  };

  public query ({ caller }) func getAllDeadPlants() : async [DeadPlant] {
    deadPlants.values().toArray();
  };

  // Worker CRUD operations
  public shared ({ caller }) func addWorker(name : Text, phone : Text, salary : Float, joinDate : Time.Time) : async Nat {
    workerIdCounter += 1;
    let worker : Worker = {
      name;
      phone;
      salary;
      joinDate;
      payments = [];
    };
    workers.add(workerIdCounter, worker);
    workerIdCounter;
  };

  public shared ({ caller }) func addWorkerPayment(workerId : Nat, date : Time.Time, amount : Float, paymentMode : Text) : async () {
    switch (workers.get(workerId)) {
      case (null) { Runtime.trap("Worker not found") };
      case (?worker) {
        let payment : WorkerPayment = {
          date;
          amount;
          paymentMode;
        };
        let updatedPayments = worker.payments.concat([payment]);
        workers.add(workerId, { worker with payments = updatedPayments });
      };
    };
  };

  public query ({ caller }) func getAllWorkers() : async [Worker] {
    workers.values().toArray();
  };

  // Customer CRUD operations
  public shared ({ caller }) func addCustomer(name : Text, phone : Text) : async () {
    let customer : Customer = {
      name;
      phone;
      totalPurchases = 0;
      totalSpent = 0.0;
      totalDiscount = 0.0;
    };
    customers.add(phone, customer);
  };

  public shared ({ caller }) func updateCustomerStats(phone : Text, purchases : Nat, spent : Float, discount : Float) : async () {
    switch (customers.get(phone)) {
      case (null) { Runtime.trap("Customer not found") };
      case (?customer) {
        customers.add(phone, { customer with
          totalPurchases = customer.totalPurchases + purchases;
          totalSpent = customer.totalSpent + spent;
          totalDiscount = customer.totalDiscount + discount;
        });
      };
    };
  };

  public query ({ caller }) func getAllCustomers() : async [Customer] {
    customers.values().toArray();
  };
};
