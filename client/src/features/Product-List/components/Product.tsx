import { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { StarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';

import { 
    Product,
    BrandsList,
    CategoriesList
} from "../../../app/interfaces";
import { 
    selectAllProducts, 
    selectTotalItems, 
    fetchProductsByFilterAsync, 
    fetchAllProductsAsync,
    selectAllCategories,
    selectAllBrands,
    fetchAllBrandsAsync,
    fetchAllCategoriesAsync
} from '../ProductSlice';
import { AppDispatch } from '../../../app/store';
import { ITEM_PER_PAGE } from '../../../app/constant';
import { Brands, Sections, SortingData, Pagination, HandlePages } from './ProductInterface'






const ProductComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const product: Product[] = useSelector(selectAllProducts);
    const totalItems: number = useSelector(selectTotalItems);
    const brands: BrandsList[] = useSelector(selectAllBrands);
    const category: CategoriesList[] = useSelector(selectAllCategories);
    
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [filter, setFilter] = useState({})
    const [sort, setSort] = useState({})
    const [page, setPage] = useState(1)
    const [limit] = useState<number>(ITEM_PER_PAGE)

    const sortOptions = [
        { name: 'Best Rating', sort: 'rating', current: false },
        { name: 'Price: Low to High', sort: 'price', current: false },
    ]

    const filters = [
        {
            id: 'brand',
            name: 'Brand',
            options: brands

        },
        {
            id: 'category',
            name: 'Category',
            options: category,
        },
    ]




    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }


    const handleFilter = (e: any, section: Brands, option: Sections) => {
        console.log(option)
        const newFilter: any = { ...filter };
        if (e.target.checked) {
            if (newFilter[section.id]) {
                newFilter[section.id].push(option.value)
            } else {
                newFilter[section.id] = [option.value]
            }
        } else {
            let index = newFilter[section.id].findIndex((ele: any) => ele === option.value)
            option.checked = false
            newFilter[section.id].splice(index, 1)
        }
        setFilter(newFilter);



    }

    function handleSorting(option: SortingData) {
        console.log(option)
        const newSort = { ...sort, _sort: option.sort }
        setSort(newSort);

    }

    function handlePages(page: number) {
        console.log(page * 10)
        setPage(page);
    }

    useEffect(() => {
        const pagination: Pagination = { _page: page, _per_page: limit } // Handle some dependencies in _limit
        // console.log(pagination)
        dispatch(fetchAllProductsAsync());
        dispatch(fetchProductsByFilterAsync({ filter, sort, pagination }));
        dispatch(fetchAllBrandsAsync());
        dispatch(fetchAllCategoriesAsync());
    }, [dispatch, filter, page]);


    return (

        <>
            <div className="bg-white">
                <div>
                    {/* Mobile filter dialog */}
                    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                            <Transition.Child
                                as={Fragment}
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-40 flex">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transition ease-in-out duration-300 transform"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transition ease-in-out duration-300 transform"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                        <div className="flex items-center justify-between px-4">
                                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                            <button
                                                type="button"
                                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                                onClick={() => setMobileFiltersOpen(false)}
                                            >
                                                <span className="sr-only">Close menu</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>

                                        {/* Filters */}
                                        <form className="mt-4 border-t border-gray-200">
                                            <h3 className="sr-only">Categories</h3>
                                            {filters.map((section) => (
                                                <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                    {({ open }) => (
                                                        <>
                                                            <h3 className="-mx-2 -my-3 flow-root">
                                                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                                    <span className="ml-6 flex items-center">
                                                                        {open ? (
                                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                        ) : (
                                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                        )}
                                                                    </span>
                                                                </Disclosure.Button>
                                                            </h3>
                                                            <Disclosure.Panel className="pt-6">
                                                                <div className="space-y-6">
                                                                    {section.options.map((option, optionIdx) => (
                                                                        <div key={option.value} className="flex items-center">
                                                                            <input
                                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                name={`${section.id}`}
                                                                                defaultValue={option.value}
                                                                                type="checkbox"
                                                                                defaultChecked={option.checked}
                                                                                onChange={(e: any) => {
                                                                                    handleFilter(e, section, option)
                                                                                }}
                                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                            >
                                                                                {option.label}
                                                                            </label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            ))}
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>

                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-2">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            Sort
                                            <ChevronDownIcon
                                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                {sortOptions.map((option: SortingData) => (
                                                    <Menu.Item key={option.name}>
                                                        {({ active }) => (
                                                            <p
                                                                className={classNames(
                                                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                                onClick={() => handleSorting(option)}
                                                            >
                                                                {option.name}
                                                            </p>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                    <span className="sr-only">View grid</span>
                                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <span className="sr-only">Filters</span>
                                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* Filters */}
                                <form className="hidden lg:block">
                                    <h3 className="sr-only">Categories</h3>
                                  

                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-4">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}`}
                                                                        defaultValue={option.value} // Use value instead of defaultValue
                                                                        type="checkbox"
                                                                        defaultChecked={option.checked} // Use checked to control the checked state
                                                                        onChange={(e: any) =>
                                                                            handleFilter(e, section, option)
                                                                        }
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-600"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>

                                {/* Product grid */}
                                <div className="lg:col-span-3">  <div className="bg-white">
                                    <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>

                                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                            {product.map((product: any) => (
                                                <div key={product.id} className="group relative">
                                                    <Link to="/product-details">
                                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                            <img
                                                                src={product.thumbnail}
                                                                alt={product.imageAlt}
                                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                            />
                                                        </div>
                                                        <div className="mt-4 flex justify-between">
                                                            <div>
                                                                <h3 className="text-sm text-gray-700">

                                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                                    {product.title}

                                                                </h3>
                                                                <p className="mt-1 text-sm text-gray-500">
                                                                    <StarIcon className='inline w-5 h-5' />
                                                                    <span className='align-bottom mx-1'>
                                                                        {product.rating}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">{Math.round(product.price * (1 - product.discountPercentage / 100))}{'$'}</p>
                                                                <p className="text-sm font-medium line-through text-gray-900">{product.price}{'$'}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div></div>
                            </div>
                        </section>
                        {<PaginationComponent page={page} handlePages={handlePages} totalItems={totalItems} />}
                    </main>
                </div>
            </div>


        </>
    )
}

export default ProductComponent


const PaginationComponent = ({ page, handlePages, totalItems }: HandlePages) => {
    const totalPages = Math.ceil(totalItems / ITEM_PER_PAGE);
    return (
        <section id="pagination">
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <div
                        onClick={() => handlePages(page > 1 ? page - 1 : page)}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </div>
                    <div
                        onClick={() => handlePages(page < totalPages ? page + 1 : page)}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </div>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{(page - 1) * ITEM_PER_PAGE + 1}
                            </span>
                            to
                            <span className="font-medium">
                                {page * ITEM_PER_PAGE > totalItems ? totalItems : (page * ITEM_PER_PAGE)}
                            </span> of{' '}
                            <span className="font-medium">{totalItems}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <div
                                onClick={() => handlePages(page > 1 ? page - 1 : page)}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                            {Array.from({ length: totalPages })
                                .map((_index: any, item) => (
                                    <div
                                        key={item}
                                        aria-current="page"
                                        className={`relative cursor-pointer z-10 inline-flex items-center ${item + 1 === page ? ` bg-blue-600 ` : `bg-gray-300`} px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                        onClick={() => handlePages(item + 1)}
                                    >
                                        {item + 1}
                                    </div>
                                ))
                            }

                            <div
                                onClick={() => handlePages(page < totalPages ? page + 1 : page)}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    )
}