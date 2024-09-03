"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchForm() {

  const router = useRouter();

  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    router.refresh();
    router.push('/pokemon?name=' + name);
  }

  useEffect(() => {
    router.push(
      `?pokemon=${name}`,
      {
        scroll: false,
      });
  }, [name, router]);

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Pokemon name:</span>
        <input
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="form-control"
        />
      </label>

      <button
        className="btn-primary"
        disabled={isLoading}
      >
        {isLoading && <span>Getting Pokemon</span>}
        {!isLoading && <span>Submit</span>}
      </button>
    </form>

  )
}