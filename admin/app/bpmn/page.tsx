'use client';

import dynamic from 'next/dynamic';

// Dùng dynamic import để tránh lỗi SSR
const BpmnModelerComponent = dynamic(() => import('@/app/components/BpmnModeler'), {
  ssr: false,
});

export default function BpmnPage() {
  return (
    <div>
      <h1>Vẽ sơ đồ BPMN</h1>
      <BpmnModelerComponent />
    </div>
  );
}
