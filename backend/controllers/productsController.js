import fs from 'node:fs/promises'
import catchAsync from "../utils/CatchAsync.js";

const products = catchAsync(async (req, res) => {
    const products = await fs.readFile('./data/available-products.json', 'utf8');
    res.json(JSON.parse(products));
  })

export default products