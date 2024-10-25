import { Switch } from '@radix-ui/react-switch';
import { useState, useRef } from 'react';

//import profileImage from './assets/profileImage.jpg';

type PbProfile = {
  //id: number;
  image: string;
  name: string;
  tags?: string[];
  bio: string;
};

export default function PbProfile() {
  const [profile, setProfile] = useState<PbProfile>({
    name: '안유진',
    tags: ['부동산', '안유진'],
    bio: '안녕하세요 부동산 투자 전문 PB 안유진입니다.',
    image:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  });

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
    //서버전송
    console.log('Profile updated:', profile);
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
    <div className='w-96 h-auto bg-[#f4f2e5] rounded-lg shadow-lg overflow-hidden'>
      <div className='bg-[#005645] flex justify-between items-center text-2xl text-[#f2f4f6] font-bold py-2 px-4 rounded-t-lg'>
        <span>내 프로필</span>

        <button
          className='text-sm text-red-600 hover:underline '
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

      <div className='flex items-center p-6'>
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

        <div className='flex flex-col ml-6 w-full'>
          <div className='flex items-center'>
            <input
              className='bg-[#f4f2e5] w-16 text-xl placeholder-black mb-2'
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

          <div className='flex flex-wrap gap-2'>
            {profile.tags?.map((tag, index) => (
              <div
                key={index}
                className='flex w-16 items-center bg-[#005645] rounded-lg mr-2'
              >
                <p className='text-[#f2f4f6] ml-1'>#</p>
                <input
                  className='bg-transparent text-[#f2f4f6] w-12'
                  type='text'
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  disabled={!isEditing}
                  placeholder='태그'
                />
                {isEditing && (
                  <button
                    className='text-red-600 ml-2'
                    type='button'
                    onClick={() => handleRemoveTag(index)}
                  >
                    x
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                className='text-[#005645] border border-[#005645] px-2 py-1 rounded-full text-sm'
                type='button'
                onClick={handleAddTag}
              >
                + 태그 추가
              </button>
            )}
          </div>

          <textarea
            className='bg-[#007b62] w-auto py-4 mt-2 text-xs text-[#f2f4f6] resize-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl'
            name='bio'
            value={profile.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder={profile.bio}
          />
          <div className='text-center text-black text-sm py-2'>로그아웃</div>
        </div>
      </div>
    </div>
  );
}
