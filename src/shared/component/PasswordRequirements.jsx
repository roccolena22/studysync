export default function PasswordRequirement() {
  return (
    <div className="text-gray-500 text-xs py-2">
      <p class="font-bold mb-1">Password Requirements:</p>
      <ul class="list-disc pl-6">
        <li>8-20 characters in length</li>
        <li>At least one uppercase letter</li>
        <li>At least one number</li>
        <li>
          At least one special character from: ! $ % & / = | ? ^ * - _ . ,
        </li>
      </ul>
    </div>
  );
}
