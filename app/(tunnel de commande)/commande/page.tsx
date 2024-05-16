"use client"
import React, { useEffect, useState } from 'react';
import { useShoppingCart } from '@/src/store/useShoppingCart';
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"
import styles from '@/src/features/tableProductList/TableProductList.module.css'
import Button from '@/components/button'
import Content from './Content'

const Commande = () => {
  const [data, setData] = useState(null);
  const { items } = useShoppingCart();
  useEffect(() => {
    const fetchData = async () => {
      let isMounted = true;
      try {
        const query = `
        query products {
          commandes {
            nodes {
              id
              title
              commande {
                idUser
                prixTotal
                cProducts {
                  produit {
                    ... on Product {
                      id
                      title
                    }
                  }
                  saisons
                }
              }
              databaseId
            }
          }
        }`
        
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
            query,
          )}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            cache: 'no-store',
          },
        )

        if (!res.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const {data} = await res.json();
        setData(data);

      } catch (error) {
        console.error('Une erreur est survenue :', error);
      }
    }
    fetchData()
    
  }, []);

  return (
    <div>
      <div className="container mw-100">
        <div className="pasElement anchor">
          <div className={styles.table}>
            <div className={styles.table_header}>
              <h1>Mes commandes</h1>
              <div className="text-right">
                <Button btn="secondary" href="/produits" isLink={true}>Retour à la boutique</Button>
              </div>
            </div>
            {data ? <Content commandes={data.commandes.nodes} /> : <h3 style={{fontSize: '3rem', lineHeight: '140%'}}>
              Tu n&nbsp;as pas encore passé de commande
            </h3> }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commande;
