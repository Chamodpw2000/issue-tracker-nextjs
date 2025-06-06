'use client'
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    // Move hooks to the top, before any conditional logic
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const numberOfPages = Math.ceil(itemCount / pageSize);
    
    // Early return after hooks are called
    if (numberOfPages <= 1) return null;

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        router.push("?" + params.toString());
    }

    return (
        <div>
            <div className='flex items-center justify-center gap-2 mt-5'>
                <Button 
                    color='gray' 
                    variant='soft' 
                    disabled={currentPage === 1}
                    onClick={() => changePage(1)}
                >
                    <DoubleArrowLeftIcon />
                </Button>
                
                <Button 
                    color='gray' 
                    variant='soft' 
                    disabled={currentPage === 1}
                    onClick={() => changePage(currentPage - 1)}
                >
                    <ChevronLeftIcon />
                </Button>
                
                <div>
                    Page {currentPage} of {numberOfPages}
                </div>
                
                <Button 
                    color='gray' 
                    variant='soft' 
                    disabled={currentPage === numberOfPages}
                    onClick={() => changePage(numberOfPages)}
                >
                    <DoubleArrowRightIcon />
                </Button>
                
                <Button 
                    color='gray' 
                    variant='soft' 
                    disabled={currentPage === numberOfPages}
                    onClick={() => changePage(currentPage + 1)}
                >
                    <ChevronRightIcon />
                </Button>
            </div>
        </div>
    );
}

export default Pagination;
