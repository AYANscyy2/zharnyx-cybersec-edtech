import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";

export function useUrlSync(
    key: string,
    defaultValue: string = "",
    debounceTime: number = 0
) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [value, setValue] = useState(() => {
        return searchParams.get(key) || defaultValue;
    });

    const debouncedValue = useDebounce(value, debounceTime);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const current = params.get(key);

        if (debouncedValue !== "" && debouncedValue !== defaultValue) {
            if (current !== debouncedValue) {
                params.set(key, debouncedValue);
                router.replace(`${pathname}?${params.toString()}`);
            }
        } else {
            if (params.has(key)) {
                params.delete(key);
                router.replace(`${pathname}?${params.toString()}`);
            }
        }
    }, [debouncedValue, key, pathname, router, searchParams, defaultValue]);

    return [value, setValue] as const;
}
