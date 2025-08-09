import Button from "../../shared/component/Button";

interface PaginationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  pageIndex: number;
  canNext: boolean;
}

export default function PaginationControls({
  onPrev,
  onNext,
  pageIndex,
  canNext,
}: PaginationControlsProps): JSX.Element {

 const canPrev= pageIndex > 1

  return (
    <div className="flex justify-between mt-4">
      <Button
      outline
      label="Prev"
        onClick={onPrev}
        disabled={!canPrev}
      />
        
<p className="text-sm text-slate-500">
               {pageIndex}
            </p>
      <Button
      outline
      label="Next"
        onClick={onNext}
        disabled={!canNext}
      />
        
    
    </div>
  );
}
