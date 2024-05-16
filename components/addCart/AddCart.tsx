'use client'

import ButtonEditSaison from '@/components/buttonEditSaison'
import { useToast } from '@/components/ui/use-toast'
import { FC, useState } from 'react'
import styles from './AddCart.module.css'
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
  const [selectedSaisons, setSelectedSaisons] = useState<number[]>([])
  const { toast } = useToast()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (item && selectedSaisons.length > 0) {
      item['saisons'] = selectedSaisons
      !isInCart ? onAdd() : onUpdate()

      toast({
        title: `Le ${item.category} ${item.title} ${
          selectedSaisons ? 'saison ' + selectedSaisons : ''
        } est ajouté dans ton panier`,
        variant: 'success',
      })
    } else {
      // alert('Vous devez choisir un ou plusieurs saisons')
      toast({
        title: 'Vous devez choisir un ou plusieurs saisons',
        variant: 'destructive',
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
    <ButtonEditSaison
      isEditing={false}
      nbSaison={ArrayNbSaison}
      handleSubmit={handleSubmit}
      className={`${styles.addCart} ${isInCart && styles.active}`}
      selectedSaisons={selectedSaisons}
      onHandleSaisonSelect={handleSaisonSelect}
    />
  )
}

export default AddCart
