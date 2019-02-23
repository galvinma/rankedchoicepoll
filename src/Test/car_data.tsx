var car_poll_items: string[] = [
  "Ford F-150",
  "Chevrolet Silverado",
  "Dodge Ram",
  "Nissan Versa",
  "Hyundai Accent",
  "Honda Fit",
  "Honda Civic",
  "Toyota Corolla",
  "Nissan Sentra",
  "Toyota Camry",
  "Honda Accord",
  "Nissan Altima",
  "Toyota RAV4",
  "Nissan Rogue",
  "Honda CR-V",
  "Jeep Grand Cherokee",
  "Ford Explorer",
  "Toyota HighLander",
  "Audi A3",
  "BMW 3 Series"]

var car_poll_one: string[][] = [
  ["Ford F-150", "Chevrolet Silverado", "Dodge Ram", "Nissan Versa", "Hyundai Accent", "Honda Fit", "Honda Civic", "Toyota Corolla", "Nissan Sentra", "Toyota Camry", "Honda Accord", "Nissan Altima", "Toyota RAV4", "Nissan Rogue", "Honda CR-V", "Jeep Grand Cherokee", "Ford Explorer", "Toyota HighLander", "Audi A3", "BMW 3 Series"],

  ["Nissan Versa", "Honda Fit", "Honda Civic",  "Nissan Sentra",  "Honda Accord", "Nissan Rogue", "Honda CR-V", "Jeep Grand Cherokee", "Ford Explorer", "Toyota HighLander", "Audi A3", "BMW 3 Series", "Chevrolet Silverado", "Hyundai Accent",  "Nissan Altima", "Ford F-150", "Toyota Corolla", "Toyota Camry", "Toyota RAV4", "Dodge Ram"],

  ["Dodge Ram",  "Honda Civic",  "Nissan Sentra",  "Honda Accord", "Nissan Rogue", "Honda CR-V", "Jeep Grand Cherokee", "Ford Explorer", "Toyota HighLander", "Chevrolet Silverado", "Hyundai Accent", "Audi A3", "BMW 3 Series", "Nissan Altima", "Ford F-150", "Toyota Corolla", "Toyota Camry", "Toyota RAV4", "Nissan Versa", "Honda Fit"],

  ["Honda Accord", "Nissan Rogue", "Jeep Grand Cherokee", "Ford Explorer", "Toyota HighLander", "Chevrolet Silverado", "Hyundai Accent", "Honda CR-V", "Audi A3", "Dodge Ram",  "Honda Civic",  "Nissan Sentra", "BMW 3 Series", "Nissan Altima", "Ford F-150", "Toyota Corolla", "Toyota Camry", "Toyota RAV4", "Nissan Versa", "Honda Fit"],

  ["Jeep Grand Cherokee", "Nissan Sentra", "BMW 3 Series", "Ford Explorer", "Honda CR-V", "Audi A3", "Dodge Ram", "Toyota HighLander", "Chevrolet Silverado", "Hyundai Accent",  "Honda Civic", "Nissan Altima", "Ford F-150", "Toyota Corolla", "Toyota Camry", "Toyota RAV4", "Nissan Versa", "Honda Fit", "Honda Accord", "Nissan Rogue"],

  ["Jeep Grand Cherokee", "Nissan Sentra", "Ford Explorer", "Honda CR-V", "Audi A3", "Nissan Rogue", "BMW 3 Series", "Dodge Ram", "Toyota HighLander",  "Honda Civic", "Nissan Altima", "Ford F-150", "Chevrolet Silverado", "Hyundai Accent", "Toyota Corolla", "Toyota Camry", "Toyota RAV4", "Nissan Versa", "Honda Fit", "Honda Accord"],

  ["Ford Explorer", "Honda CR-V", "Audi A3", "Nissan Rogue", "BMW 3 Series", "Dodge Ram", "Honda Accord", "Toyota HighLander",  "Honda Civic", "Nissan Sentra", "Chevrolet Silverado", "Hyundai Accent", "Toyota Corolla", "Toyota Camry", "Toyota RAV4", "Nissan Versa", "Honda Fit", "Nissan Altima", "Ford F-150", "Jeep Grand Cherokee"],

  ["Toyota Corolla", "Ford Explorer", "BMW 3 Series", "Dodge Ram", "Honda Accord", "Toyota HighLander", "Honda Fit", "Honda Civic", "Nissan Sentra", "Honda CR-V", "Audi A3", "Nissan Rogue", "Chevrolet Silverado", "Hyundai Accent", "Toyota Camry", "Toyota RAV4", "Nissan Versa", "Nissan Altima", "Ford F-150", "Jeep Grand Cherokee"],

  ["BMW 3 Series", "Chevrolet Silverado", "Hyundai Accent", "Toyota Corolla", "Ford Explorer", "Dodge Ram", "Honda Fit", "Honda Civic", "Nissan Sentra", "Honda CR-V", "Audi A3", "Nissan Rogue", "Toyota Camry", "Toyota RAV4", "Nissan Versa", "Nissan Altima", "Ford F-150", "Jeep Grand Cherokee", "Honda Accord", "Toyota HighLander"],

  ["Toyota HighLander", "Hyundai Accent", "Toyota Corolla", "Ford Explorer", "Dodge Ram", "Honda Fit", "Honda Civic", "Nissan Sentra", "Honda CR-V", "Audi A3", "BMW 3 Series", "Chevrolet Silverado", "Nissan Rogue", "Toyota Camry", "Toyota RAV4", "Nissan Versa", "Nissan Altima", "Ford F-150", "Jeep Grand Cherokee", "Honda Accord"],

  ["Honda Fit", "Honda Civic", "BMW 3 Series", "Toyota HighLander", "Chevrolet Silverado", "Hyundai Accent", "Toyota Corolla", "Ford Explorer", "Dodge Ram", "Nissan Sentra", "Honda CR-V", "Audi A3", "Nissan Rogue", "Toyota Camry", "Toyota RAV4", "Nissan Versa", "Nissan Altima", "Ford F-150", "Jeep Grand Cherokee", "Honda Accord"],

  ["Audi A3", "Toyota HighLander", "Chevrolet Silverado", "Hyundai Accent", "Toyota Corolla", "Ford Explorer", "Dodge Ram", "Nissan Sentra", "Honda CR-V", "Honda Fit", "Honda Civic", "BMW 3 Series", "Nissan Rogue", "Toyota Camry", "Toyota RAV4", "Nissan Versa", "Nissan Altima", "Ford F-150", "Jeep Grand Cherokee", "Honda Accord"],

  ["Toyota RAV4", "Honda Accord", "Nissan Versa", "Toyota Camry", "Nissan Altima", "Audi A3", "Toyota HighLander", "Chevrolet Silverado", "Hyundai Accent", "Toyota Corolla", "Ford Explorer", "Dodge Ram", "Nissan Sentra", "Honda CR-V", "Honda Fit", "Honda Civic", "BMW 3 Series", "Nissan Rogue", "Ford F-150", "Jeep Grand Cherokee"],

  ["Nissan Altima", "Audi A3", "Toyota HighLander", "Chevrolet Silverado", "Hyundai Accent", "Toyota Corolla", "Ford Explorer", "Ford F-150", "Jeep Grand Cherokee", "Dodge Ram", "Nissan Sentra", "Honda CR-V", "Honda Fit", "Honda Civic", "BMW 3 Series", "Nissan Rogue", "Toyota RAV4", "Honda Accord", "Nissan Versa", "Toyota Camry"],

  ["Nissan Versa", "Ford Explorer", "Ford F-150", "Nissan Altima", "Honda Civic", "BMW 3 Series", "Audi A3", "Toyota HighLander", "Chevrolet Silverado", "Hyundai Accent", "Toyota Corolla", "Jeep Grand Cherokee", "Dodge Ram", "Nissan Sentra", "Honda CR-V", "Honda Fit", "Nissan Rogue", "Toyota RAV4", "Honda Accord", "Toyota Camry"],

  ["Nissan Versa", "Ford Explorer", "Ford F-150", "Nissan Altima", "Honda Civic", "BMW 3 Series", "Audi A3", "Toyota HighLander", "Chevrolet Silverado", "Hyundai Accent", "Toyota Corolla", "Jeep Grand Cherokee", "Honda Fit", "Nissan Rogue", "Toyota RAV4", "Honda Accord", "Toyota Camry", "Dodge Ram", "Nissan Sentra", "Honda CR-V", ],

  ["Nissan Sentra", "Honda CR-V", "Audi A3", "Nissan Rogue", "Toyota Camry", "Toyota RAV4", "Nissan Versa", "Nissan Altima", "Ford F-150", "Jeep Grand Cherokee", "Honda Accord", "Toyota HighLander", "BMW 3 Series", "Chevrolet Silverado", "Hyundai Accent", "Toyota Corolla", "Ford Explorer", "Dodge Ram", "Honda Fit", "Honda Civic"],

  ["Nissan Rogue", "Toyota Camry", "Toyota RAV4", "Nissan Versa", "Nissan Altima", "Ford F-150", "Jeep Grand Cherokee", "Honda Accord", "BMW 3 Series", "Chevrolet Silverado", "Hyundai Accent", "Nissan Sentra", "Honda CR-V", "Audi A3", "Toyota Corolla", "Ford Explorer", "Dodge Ram", "Honda Fit", "Honda Civic", "Toyota HighLander"],

  ["Nissan Rogue", "Toyota Corolla", "Toyota Camry", "Toyota RAV4", "Nissan Versa", "Nissan Altima", "Ford F-150", "Jeep Grand Cherokee", "Honda Accord", "BMW 3 Series", "Chevrolet Silverado", "Hyundai Accent", "Nissan Sentra", "Honda CR-V", "Audi A3", "Ford Explorer", "Dodge Ram", "Honda Fit", "Honda Civic", "Toyota HighLander"],


  ["Ford Explorer", "Dodge Ram", "Nissan Altima", "Ford F-150", "Jeep Grand Cherokee", "Honda Accord", "BMW 3 Series", "Chevrolet Silverado", "Nissan Rogue", "Toyota Camry", "Toyota RAV4", "Nissan Versa", "Hyundai Accent", "Nissan Sentra", "Toyota Corolla", "Honda Fit", "Honda Civic", "Toyota HighLander", "Honda CR-V", "Audi A3"]]

export { car_poll_items, car_poll_one }
