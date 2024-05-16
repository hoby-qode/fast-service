'use client'

import React, { useState } from 'react'

import TableCommandeList from '@/src/features/tableCommandeList'
import { ChevronsUpDown, Plus, X } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useSession } from 'next-auth/react';

// const Content = ({products}:{products:any}) => {
const Content = ({commandes}:{commandes:any}) => {
  const { data: session } = useSession();
  const [load, setLoad] = useState(true)
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="mt-5">
      {commandes.map((commande) => 
        commande.commande.idUser == session?.user?.name && 
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-[350px] space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">
                {commande.title} {commande.commande.idUser}
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
              {
                commande.commande.cProducts && commande.commande.cProducts.map((item) => 
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                  {item.produit.title}
                </div>)
              }
            </CollapsibleContent>
          </Collapsible> 
        )}
      </div>
  )
}

export default Content
