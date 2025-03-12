// Web3 işlemleri
export const connectWallet = async () => {
  try {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      return accounts[0];
    } else {
      throw new Error('Lütfen MetaMask yükleyin!');
    }
  } catch (error) {
    console.error('Bağlantı hatası:', error);
    throw error;
  }
};

export const stakeTokens = async (amount) => {
  try {
    // Amount değerinin sayı olup olmadığını kontrol et
    if (!amount || isNaN(amount) || amount <= 0) {
      throw new Error('Geçerli bir stake miktarı giriniz (0\'dan büyük bir sayı olmalı)');
    }

    // Ondalık sayı kontrolü (örneğin en fazla 18 ondalık basamak)
    if (amount.toString().includes('.')) {
      const decimals = amount.toString().split('.')[1].length;
      if (decimals > 18) {
        throw new Error('En fazla 18 ondalık basamak kullanılabilir');
      }
    }

    // Stake işlemi burada gerçekleştirilecek
    // ... contract işlemleri ...

    return true;
  } catch (error) {
    console.error('Stake hatası:', error);
    throw error;
  }
};

export const claimReward = async (booksRead) => {
  try {
    if (booksRead < 3) {
      throw new Error('Ödül almak için en az 3 kitap bitirmelisiniz!');
    }
    // Ödül talep işlemi burada gerçekleştirilecek
    return true;
  } catch (error) {
    console.error('Ödül talep hatası:', error);
    throw error;
  }
};

// Kitap işlemleri
export const formatBookProgress = (currentPage, totalPages) => {
  return `${currentPage} / ${totalPages}`;
};

export const truncateAddress = (address) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(38)}`;
};

// Örnek kitap verileri
export const sampleBooks = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    description: "Distopik bir gelecekte geçen, gözetim toplumunu anlatan klasik roman.",
    totalPages: 328,
    coverImage: "https://example.com/1984.jpg",
    preview: "Distopik bir dünyada Winston Smith'in Büyük Birader'e karşı mücadelesi..."
  },
  {
    id: 2,
    title: "Suç ve Ceza",
    author: "Fyodor Dostoyevski",
    description: "Psikolojik bir başyapıt, suç ve vicdan kavramlarını sorgulayan roman.",
    totalPages: 671,
    coverImage: "https://example.com/crime-and-punishment.jpg",
    preview: "Raskolnikov'un işlediği cinayetin psikolojik sonuçları..."
  },
]; 