namespace Project_Bier.Models
{
    public struct ProductOrder
    {
        Product product;
        int count;

        public ProductOrder(Product product, int count)
        {
            this.product = product;
            this.count = count;
        }
    }
}