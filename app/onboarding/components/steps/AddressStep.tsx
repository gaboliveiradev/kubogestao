import { InputCEP } from "@/components/form/InputCEP";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flag01Icon, Flag02Icon, GlobalIcon, Location01Icon, RoadLocation01Icon, TextNumberSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function AddressStep() {
  return (
    <div className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
      <div className='lg:col-span-3 col-span-12 space-y-2'>
        <Label htmlFor="zipcode" className="text-sm font-medium">
          CEP *
        </Label>
        <div className="relative">
          <HugeiconsIcon icon={Location01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <InputCEP
            name="zipcode"
            className="pl-11"
          />
        </div>
      </div>

      <div className='lg:col-span-7 col-span-12 space-y-2'>
        <Label htmlFor="address" className="text-sm font-medium">
          Logradouro *
        </Label>
        <div className="relative">
          <HugeiconsIcon icon={RoadLocation01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            name="address"
            placeholder="Endereço Rua ou Avenida"
            className="kubo-input pl-11"
            maxLength={18}
          />
        </div>
      </div>

      <div className='lg:col-span-2 col-span-12 space-y-2'>
        <Label htmlFor="number" className="text-sm font-medium">
          Número
        </Label>
        <div className="relative">
          <HugeiconsIcon icon={TextNumberSignIcon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            name="number"
            placeholder="Número"
            className="pl-11"
          />
        </div>
      </div>

      <div className='lg:col-span-5 col-span-12 space-y-2'>
        <Label htmlFor="neighborhood" className="text-sm font-medium">
          Bairro *
        </Label>
        <div className="relative">
          <HugeiconsIcon icon={Flag01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            name="neighborhood"
            className="pl-11"
            placeholder="Bairro"
          />
        </div>
      </div>

      <div className='lg:col-span-5 col-span-12 space-y-2'>
        <Label htmlFor="city" className="text-sm font-medium">
          Cidade *
        </Label>
        <div className="relative">
          <HugeiconsIcon icon={GlobalIcon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            name="city"
            className="pl-11"
            placeholder="Cidade"
          />
        </div>
      </div>

      <div className='lg:col-span-2 col-span-12 space-y-2'>
        <Label htmlFor="state" className="text-sm font-medium">
          Estado *
        </Label>
        <div className="relative">
          <HugeiconsIcon icon={Flag02Icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            name="state"
            className="pl-11"
            placeholder="Estado"
          />
        </div>
      </div>
    </div>
  );
}
