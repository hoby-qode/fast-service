import { Checkbox } from '@/components/ui/checkbox'
import { FC } from 'react'

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
export default Saison
