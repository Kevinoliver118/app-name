const btnCart = document.querySelector('.container-icon')
const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

<script>
			document.addEventListener("DOMContentLoaded", function () {
			  document.getElementById("searchInput").addEventListener("input", function () {
				const searchTerm = this.value.toLowerCase();
				const items = document.querySelectorAll(".item");
		  
				items.forEach(function (item) {
				  const productName = item.querySelector("h2").innerText.toLowerCase();
		  
				  if (productName.includes(searchTerm)) {
					item.style.display = "block";
				  } else {
					item.style.display = "none";
				  }
				});
			  });
			});
