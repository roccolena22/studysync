import { useState } from "react";
import { updateUser } from "../../../api/apiUsers";
import Button from "../../../shared/component/Button";

interface EditUserInfoFormProps {
  userId: string;
  initialInfo: string;
  onSave: (newInfo: string) => void;
}

export default function EditUserInfoForm({
  userId,
  initialInfo,
  onSave,
}: EditUserInfoFormProps) {
  const [info, setInfo] = useState(initialInfo);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser(userId, { info });
      onSave(info);
    } catch (error) {
      console.error("Errore durante aggiornamento info:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <textarea
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        className="border rounded p-2 w-full h-40"
        placeholder="Scrivi qualcosa..."
      />
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          disabled={loading}
         
         label={loading ? "Salvataggio..." : "Salva"}
        />
          
      </div>
    </form>
  );
}
