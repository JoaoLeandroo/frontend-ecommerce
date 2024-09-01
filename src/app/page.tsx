"use client"
import { api } from "@/services/api";
import Container from "@/components/Container"
import BannerHome from "@/components/others/BannerHome";
import { useState } from "react";

export default function Home() {

  const [products, setProducts] = useState([]);

  const fetchData = async () => {

      const response = await api.get('/list-products');
      return setProducts(response.data);

};

fetchData()


  return (
    <Container>
      <section>
        <BannerHome/>
      </section>
      <section className="mt-5">
        {products.map((items: any) => (
          <div key={items.id}>
            <p>{items.nomeProduto} - {items.quantidade}</p>
          </div>
        ))}
      </section>
    </Container>
  );
}
