'use client'

import { Checkbox } from '@/components/ui/checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { FC, useState } from 'react'
import { Button } from '../ui/button'
import styles from './AddCart.module.css'
import { useToast } from "@/components/ui/use-toast"
interface CartItem {
  id: number
  title: string
  nbSaison?: number
  category: string
  saisons?: []
}
interface AddCartProps {
  item: CartItem
  isInCart?: boolean | undefined
  onAdd?: () => void
  onRemove?: () => void
  onUpdate?: () => void
}
const AddCart: FC<AddCartProps> = ({
  item,
  isInCart,
  onAdd,
  onRemove,
  onUpdate,
}) => {
  const ArrayNbSaison = item.nbSaison
    ? Array.from({ length: item.nbSaison }, (v, i) => i + 1)
    : []
  const [selectedSaisons, setSelectedSaisons] = useState<number[]>([])
  const { toast } = useToast()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (item && selectedSaisons.length > 0) {
      item['saisons'] = selectedSaisons
      !isInCart ? onAdd() : onUpdate()

      toast({
        title: `Le ${item.category} ${item.title} ${selectedSaisons ? 'saison ' + selectedSaisons : ''} est ajouté dans ton panier`,
        variant: "success"
      })
    } else {
      // alert('Vous devez choisir un ou plusieurs saisons')
      toast({
        title: "Vous devez choisir un ou plusieurs saisons",
        variant: "destructive",
      })
    }
  }
  const handleSaisonSelect = (saison: number) => {
    setSelectedSaisons((prevSaisons) => {
      if (prevSaisons.includes(saison)) {
        return prevSaisons.filter((prevSaison) => prevSaison !== saison)
      } else {
        return [...prevSaisons, saison]
      }
    })
  }
  return item.category != 'series' || isInCart ? (
    <button
      className={`${styles.addCart} ${isInCart && styles.active}`}
      onClick={!isInCart ? onAdd : onRemove}
    >
      <span>+</span>
    </button>
  ) : (
    <Popover>
      <PopoverTrigger
        className={`${styles.addCart} ${isInCart && styles.active}`}
      >
        <span>+</span>
      </PopoverTrigger>
      <PopoverContent>
        <ScrollArea className="h-[200px] rounded-md border p-2">
          <h3 className="font-bold mb-2">Saisons disponible</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            {ArrayNbSaison.map((nombre, index) => (
              <div className="" key={index}>
                <Saison
                  saison={index + 1}
                  onSelect={() => handleSaisonSelect(index + 1)}
                  isSelected={selectedSaisons.includes(index + 1)}
                />
                <Separator className="my-2" />
              </div>
            ))}
            <Button type="submit">Ajouter au panier</Button>
          </form>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
interface SaisonProps {
  saison: number
  onSelect: () => void
  isSelected: boolean
}

const Saison: FC<SaisonProps> = ({ saison, onSelect, isSelected }) => {
  return (
    <div className="saison">
      <Checkbox
        id={`saison-${saison}`}
        checked={isSelected}
        onCheckedChange={onSelect}
      />
      <label
        htmlFor={`saison-${saison}`}
        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 position-static m-0 ml-1 bg-inherit pl-1"
      >
        Saison {saison}
      </label>
    </div>
  )
}
export default AddCart
