'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import Skeleton from 'react-loading-skeleton';

interface CategoryBoxProps {
    icon: IconType,
    label: string;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected,
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        router.push(url);
    }, [label, router, params]);

    return (
        <div
            onClick={handleClick}
            className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        px-3 py-1
        border-b-2
        hover:text-gray-700/60
        transition
        cursor-pointer
        ${selected ? 'border-b-brand text-brand' : 'border-transparent text-gray-500'}
 
      `}
        >
        
            { Icon ?  <Icon size={20} /> : <Skeleton width = "30px" height = "30px"  circle/> }

           {
            label ?  <div className="text-sm font-medium">
            {label}
        </div> :
            <Skeleton width  = "20px" height = "10px" />
           } 
           
        </div>
    );
}

export default CategoryBox;