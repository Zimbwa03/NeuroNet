export default function NeuralBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 neural-bg opacity-10 animate-neural-pulse"></div>
      
      {/* Neural network particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-electric-blue rounded-full animate-neural-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-electric-blue rounded-full animate-neural-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-electric-blue rounded-full animate-neural-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-electric-blue rounded-full animate-neural-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-electric-blue rounded-full animate-neural-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-3/4 right-1/6 w-1 h-1 bg-electric-blue rounded-full animate-neural-pulse" style={{animationDelay: '2.5s'}}></div>
      </div>
    </div>
  );
}
