import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { AiFillEdit } from 'react-icons/ai'
import Saison from '../saison'

const ButtonEditSaison = ({
  nbSaison,
  handleSubmit,
  isEditing,
  onHandleSaisonSelect,
  selectedSaisons,
  ...props
}) => {
  const ArrayNbSaison = nbSaison
    ? Array.from({ length: nbSaison }, (v, i) => i + 1)
    : []

  return (
    <Popover>
      <PopoverTrigger {...props}>
        {isEditing ? (
          <AiFillEdit style={{ color: 'intial' }} />
        ) : (
          <span>+</span>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <ScrollArea className="h-[200px] rounded-md border p-2 bg-background">
          <h3 className="font-bold mb-2 text-foreground">Saisons disponible</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            {ArrayNbSaison.length > 0 ? (
              ArrayNbSaison.map((nombre, index) => (
                <div className="" key={index}>
                  <Saison
                    saison={index + 1}
                    onSelect={() => onHandleSaisonSelect(index + 1)}
                    isSelected={selectedSaisons.includes(index + 1)}
                  />
                  <Separator className="my-2" />
                </div>
              ))
            ) : (
              <div className="">
                <Saison
                  saison={1}
                  onSelect={() => onHandleSaisonSelect(1)}
                  isSelected={selectedSaisons.includes(1)}
                />
                <Separator className="my-2" />
              </div>
            )}
            <Button type="submit">Ajouter au panier</Button>
          </form>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

export default ButtonEditSaison
