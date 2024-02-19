'use client'
import useProgressValue from "~/hooks/useProgressValue";


export default function Loading() {
  const { progress} = useProgressValue(250)
	return (
		<div className="fixed top-0 inset-x-0 w-full">
      <progress
				className="progress w-full"
				value={progress}
				max="100"
			></progress>
		</div>
	);
}
