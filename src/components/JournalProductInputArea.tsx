import { useState, useRef, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import useFetch from '../hooks/useFetch';

type TJournalProductInputAreaProps = {
  recommendedProductsKeys: number[];
  setRecommendedProductsKeys: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function JournalProductInputArea({
  recommendedProductsKeys,
  setRecommendedProductsKeys,
}: TJournalProductInputAreaProps) {
  const [inputValue, setInputValue] = useState('');
  const debouncedSearchTerm = useDebounce(inputValue, 300);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const { data: productList } = useFetch<{ id: number; productName: string }[]>(
    debouncedSearchTerm && `pb/journals/products?tag=${debouncedSearchTerm}`
  );

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isListVisible, setIsListVisible] = useState(false);

  // const handleProductSelect = (productName: string, productId: number) => {
  //   if (!selectedProducts.includes(productName)) {
  //     setSelectedProducts((prev) => [...prev, productName]);
  //     setRecommendedProductsKeys((prev) => [...prev, productId]);
  //   }
  //   setInputValue('');
  //   setIsListVisible(false);
  // };
  // // console.log('recommendedProductsKeys: ', recommendedProductsKeys);

  const handleProductSelect = (productName: string, productId: number) => {
    if (!selectedProducts.includes(productName)) {
      setSelectedProducts((prev) => [...prev, productName]);
      setRecommendedProductsKeys((prev) => [...prev, productId]); // 부모 상태 업데이트
    }
    setInputValue('');
    setIsListVisible(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && productList && productList.length > 0) {
      const firstProduct = productList[0];
      handleProductSelect(firstProduct.productName, firstProduct.id);
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsListVisible(true);
    } else {
      setIsListVisible(false);
    }
  }, [debouncedSearchTerm]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      listRef.current &&
      !listRef.current.contains(event.target as Node) &&
      textareaRef.current &&
      !textareaRef.current.contains(event.target as Node)
    ) {
      setIsListVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative w-full'>
      {/* 텍스트 입력 영역 */}
      <textarea
        ref={textareaRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        className='w-full h-10 p-2 border resize-none text-sm overflow-y-auto focus:outline-hanasilver'
        placeholder='상품을 검색하세요'
      />

      {/* 검색 결과 리스트 */}
      {isListVisible && productList && productList.length > 0 && (
        <ul
          ref={listRef}
          className={`absolute z-10 w-full bg-white border border-gray-300 shadow-lg overflow-y-auto ${
            productList.length > 4 ? 'max-h-32' : ''
          }`}
        >
          {productList.map((product) => (
            <li
              key={product.id}
              onClick={() =>
                handleProductSelect(product.productName, product.id)
              }
              className='px-4 py-2 cursor-pointer hover:bg-gray-100'
            >
              {product.productName}
            </li>
          ))}
        </ul>
      )}

      {/* 선택된 상품 리스트 */}
      {selectedProducts.length > 0 && (
        <div className='mt-4'>
          <ul className='list-disc ml-5 text-sm'>
            {selectedProducts.map((productName, index) => (
              <li key={index}>{productName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
