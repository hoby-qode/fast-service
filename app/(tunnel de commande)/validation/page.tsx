"use client"
import React, { useEffect, useState } from 'react';
import Content from './Content';
import { useShoppingCart } from '@/src/store/useShoppingCart';
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"
import styles from '@/src/features/tableProductList/TableProductList.module.css'
import Button from '@/components/button'

const Commande = () => {
  const [data, setData] = useState(null);
  const { items } = useShoppingCart();
  useEffect(() => {
    let isMounted = true;

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
        
        const variables = { ids: Ids };

        const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, variables }),
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const {data} = await response.json();
        if (isMounted) {
          setData(data);
        }
      } catch (error) {
        console.error('Une erreur est survenue :', error);
      }
    };
    if (items) {
      const idsCart = items.map((element: any) => element.id);
      if (idsCart.length > 0) {
        fetchData(idsCart);
      }
    }
  }, [items]);

  return (
    <div>
      <div className="container mw-100">
        {
          data ? <Content products={data?.products?.nodes}/> 
          : <div className="pasElement anchor">
              <div className={styles.table}>
                <div className={styles.table_header}>
                  <h1>Mes commandes</h1>
                  <div className="text-right">
                    <Button btn="secondary" href="/produits" isLink={true}>Retour à la boutique</Button>
                  </div>
                </div>
                <h3 style={{fontSize: '3rem', lineHeight: '140%'}}>Il n&apos;y a pas d&apos;élément dans ton panier. </h3>
              </div>
            </div>
          }
      </div>
    </div>
  );
};

export default Commande;
