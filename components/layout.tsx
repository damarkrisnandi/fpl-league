import BottomNav from "./layout/bottomNav"
import HeaderMain from "./layout/header"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
          <HeaderMain/>
              <div className='h-24 w-full'></div>
              {children}
              <div className='h-24 w-full'></div>
              <BottomNav />
      </div>
    )
  }