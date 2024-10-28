import { Switch } from '@radix-ui/react-switch';
import { useState, useRef } from 'react';

type PbProfile = {
  //id: number;
  image: string;
  name: string;
  tags: string[];
  bio: string;
};

export default function PbProfile() {
  const [profile, setProfile] = useState<PbProfile>({
    name: '안유진',
    tags: ['부동산', '안유진', 'ㅋ'],
    bio: '안녕하세요 부동산 투자 전문 PB 안유진입니다.',
    image:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  });

  // console.log('**************', profile.tags?.length);
  const [isEditing, setIsEditing] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [Image, setImage] = useState(profile.image);

  const fileInput = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagChange = (index: number, newTag: string) => {
    setProfile((prev) => {
      const updatedTags = [...(prev.tags || [])];
      updatedTags[index] = newTag;
      return { ...prev, tags: updatedTags };
    });
  };

  const handleAddTag = () => {
    // 태그 입력값이 비어있으면 새로운 태그 추가 안 됨
    setProfile((prev) => ({
      ...prev,
      tags: [...(prev.tags || []), ''],
    }));
  };

  const handleRemoveTag = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    // 서버전송
    // 태그 입력값이 비어있으면 프로필 저장 안 됨
    // console.log('Profile updated:', profile);
    setIsEditing(false); //수정완
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setProfile((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200'>
      <div className='bg-hanaindigo text-[#fff] text-[1.3rem] font-extrabold p-3 pl-5 rounded-t-lg'>
        <span>내 프로필</span>

        <button
          className='text-sm text-red-600 hover:underline ml-3'
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <button className=' text-red-600 ' onClick={handleSubmit}>
              저장
            </button>
          ) : (
            'EDIT'
          )}
        </button>
      </div>

      <div className='flex items-center pl-3 pr-3'>
        <input
          type='file'
          style={{ display: 'none' }}
          accept='image/jpg,image/png,image/jpeg'
          name='profile_img'
          onChange={handleImage}
          //disabled={!isEditing}
          ref={fileInput}
        />

        <img
          className='w-28 h-28 rounded-full'
          src={Image}
          alt='프로필 이미지'
          onClick={() => {
            isEditing && fileInput.current?.click();
          }}
        />

        <div className='flex flex-col ml-3 mt-3 w-full justify-between'>
          <div className='flex items-center'>
            <input
              className='bg-[#fff] w-16 text-xl placeholder-black mb-2 font-bold'
              type='text'
              name='name'
              value={profile.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder={profile.name}
            />
            <p className='mr-4'>PB</p>
            <Switch
              checked={isWorking}
              onCheckedChange={setIsWorking}
              className={`${
                isWorking ? 'bg-green-500' : 'bg-red-500'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  isWorking ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          <div className='flex flex-wrap gap-1'>
            {profile.tags?.map((tag, index) => (
              <div
                key={index}
                className='flex items-center bg-hanaindigo rounded-lg mr-2 h-8 p-1 w-[28%]'
              >
                <p className='text-[#fff] text-xs mx-1'>#</p>
                <input
                  className='bg-transparent text-[#fff] text-xs w-full'
                  type='text'
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  disabled={!isEditing}
                  placeholder='입력'
                  maxLength={5}
                />
                {isEditing && (
                  <button
                    className='text-red-600 ml-3 mr-2'
                    type='button'
                    onClick={() => handleRemoveTag(index)}
                  >
                    x
                  </button>
                )}
              </div>
            ))}
            {isEditing && profile.tags?.length < 3 && (
              <button
                className='text-hanaindigo border border-hanaindigo px-2 py-1 rounded-full text-sm'
                type='button'
                onClick={handleAddTag}
              >
                + 태그 추가
              </button>
            )}
          </div>

          {/* 한줄 자기소개 */}
          <textarea
            className='bg-hanaindigo w-auto p-3 mt-2 text-xs text-[#fff] resize-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl'
            name='bio'
            value={profile.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder={profile.bio}
          />

          <div className='flex justify-end py-2 mr-1'>
            <button className='text-black text-sm font-bold'>로그아웃</button>
          </div>
        </div>
      </div>
    </div>
  );
}
