"use client"
import React, { useEffect, useState } from 'react';
import Content from './Content';
import { useShoppingCart } from '@/src/store/useShoppingCart';

const Cart = () => {
  const [data, setData] = useState(null);
  const { items, addItem, removeItem } = useShoppingCart();
  useEffect(() => {
    const fetchData = async (Ids: any) => {
      try {
        const query = `
        query QueryProductBySlug{
          products(where: {in: [${Ids}]}) {
              nodes {
                  databaseId
                  title
                  slug
                  acf_product {
                      dateDeSortie
                      rating
                      acteurs {
                          actorname
                          name
                      }
                  }
                  featuredImage {
                      node {
                          sourceUrl
                      }
                  }
                  status
                  content
                  hqTags {
                      nodes {
                          name
                          slug
                      }
                  }
                  categoriesProduct {
                    nodes {
                      slug
                      prix {
                        prix
                      }
                    }
                  } 
              }
          }
        }`

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(query)}`, { cache: 'no-store' }
        );

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const {data} = await response.json();
        setData(data);
      } catch (error) {
        console.error('Une erreur est survenue :', error);
      }
    };
    if (items) {
      let idsCart = [];
      idsCart = items.map(function(element:any) {
          return element.id;
      });

      if (idsCart.length > 0) {
        fetchData(idsCart);
      }
    }    
  }, [items]);

  return (
    <div>
      <div className="container mw-100">
        {data && <Content products={data?.products?.nodes}/>}
      </div>
    </div>
  );
};

export default Cart;
